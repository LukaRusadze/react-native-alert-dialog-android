import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import type {
  CommonOptions,
  OptionButtonTypes,
  ButtonDialogOptions,
  MessageDialogOptions,
} from './types';

const LINKING_ERROR =
  `The package 'react-native-alert-dialog-android' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const DialogModule = NativeModules.AlertDialogAndroid
  ? NativeModules.AlertDialogAndroid
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const buttonSubscriptions = new Map<string, any>();
const optionSubscriptions = new Map<string, any>();

const dialogEmitter = new NativeEventEmitter(DialogModule);

export function ButtonDialog({ buttons, ...props }: ButtonDialogOptions) {
  buttons?.forEach((button) => {
    addMenuOption(button.title, button.onPress!);
  });

  initializeDialog(props);
  DialogModule.showDialog();
}

export function MessageDialog({ message, ...props }: MessageDialogOptions) {
  initializeDialog(props);
  DialogModule.setMessage(message);
  DialogModule.showDialog();
}

dialogEmitter.addListener('RNAD-onClose', () => {
  buttonSubscriptions.forEach((subscription) => subscription.remove());
  buttonSubscriptions.clear();

  optionSubscriptions.forEach((subscription) => subscription.remove());
  optionSubscriptions.clear();
});

function initializeDialog({
  menuTitle,
  negative,
  neutral,
  positive,
}: CommonOptions) {
  DialogModule.createDialog();
  if (positive) {
    setOptionButton('Positive', positive.title, positive.onPress);
  }
  if (negative) {
    setOptionButton('Negative', negative.title, negative.onPress);
  }
  if (neutral) {
    setOptionButton('Neutral', neutral.title, neutral.onPress);
  }
  DialogModule.setMenuTitle(menuTitle);
}

function addMenuOption(title: string, onPress: () => void) {
  let subscription = buttonSubscriptions.get(title);

  if (subscription != null) {
    subscription.remove();
  } else {
    DialogModule.addMenuOption(title);
  }
  subscription = dialogEmitter.addListener(
    'RNAD-didPressMenuOption',
    (event) => {
      if (event.title === title) {
        onPress();
      }
    }
  );
  buttonSubscriptions.set(title, subscription);
}

function setOptionButton(
  buttonType: OptionButtonTypes,
  title: string,
  onPress: () => void
) {
  let subscription = optionSubscriptions.get(title);

  if (subscription != null) {
    subscription.remove();
  } else {
    DialogModule[`set${buttonType}Button`](title);
  }

  subscription = dialogEmitter.addListener(`RNAD-on${buttonType}Press`, () => {
    onPress();
  });
  optionSubscriptions.set(title, subscription);
}
