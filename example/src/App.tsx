import React from 'react';
import { View, Button } from 'react-native';
import { ButtonDialog, MessageDialog } from 'react-native-alert-dialog-android';

export default function App() {
  return (
    <View>
      <Button
        onPress={() =>
          MessageDialog({
            menuTitle: 'Title',
            message: 'Hello World',
            negative: { title: 'Cancel', onPress: () => console.log('Cancel') },
            positive: { title: 'OK', onPress: () => console.log('OK') },
            neutral: {
              title: 'Netural',
              onPress: () => console.log('Netural'),
            },
          })
        }
        title={'Message Menu'}
      />
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
              title: 'Neutral',
              onPress: () => console.log('Neutral'),
            },
          });
        }}
        title="Button Menu"
      />
    </View>
  );
}
