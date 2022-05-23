export type OptionButtonTypes = 'Positive' | 'Negative' | 'Neutral';
export type Options = { title: string; onPress: () => void };

export interface CommonOptions {
  menuTitle: string;
  positive: Options;
  negative: Options;
  neutral: Options;
}

export interface ButtonDialogOptions extends CommonOptions {
  buttons: Array<Options>;
}

export interface MessageDialogOptions extends CommonOptions {
  message: string;
}
