# react-native-alert-dialog-android

Displays Android's native AlertDialog

## Installation

```sh
npm install react-native-alert-dialog-android
```

## Usage

# Message Dialog

```js
import { MessageDialog } from 'react-native-alarm-dialog';

// ...

<Button
  onPress={() =>
    MessageDialog({
      menuTitle: 'Title',
      message: 'Hello World',
      negative: { title: 'Cancel', onPress: () => console.log('Cancel') },
      positive: { title: 'OK', onPress: () => console.log('OK') },
      neutral: {
        title: 'Neutral',
        onPress: () => console.log('Neutral'),
      },
    })
  }
  title={'Message Menu'}
/>;
```

# Button Dialog

```js
import { ButtonDialog } from 'react-native-alarm-dialog';

// ...

<Button
  onPress={() => {
    ButtonDialog({
      menuTitle: 'Title',
      buttons: [
        { title: 'Button 1', onPress: () => console.log('Button 1') },
        { title: 'Button 2', onPress: () => console.log('Button 2') },
        { title: 'Button 3', onPress: () => console.log('Button 3') },
      ],
      negative: { title: 'Cancel', onPress: () => console.log('Cancel') },
      positive: { title: 'OK', onPress: () => console.log('OK') },
      neutral: {
        title: 'Netural',
        onPress: () => console.log('Netural'),
      },
    });
  }}
  title="Button Menu"
/>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
