package com.reactnativealertdialogandroid;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.LinkedHashMap;

@ReactModule(name = AlertDialogAndroidModule.NAME)
public class AlertDialogAndroidModule extends ReactContextBaseJavaModule {
    public static final String NAME = "AlertDialogAndroid";

  private AlertDialog optionsDialog;
  private ReactApplicationContext reactContext;
  LinkedHashMap<String, OptionHandler> options = new LinkedHashMap<>();

  public AlertDialogAndroidModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @ReactMethod
  public void createDialog() {
    final OptionHandler[] optionHandlers = options.values().toArray(new OptionHandler[0]);

    final Context context = reactContext.getCurrentActivity();

    optionsDialog = new AlertDialog
      .Builder(context)
      .setItems(
        options.keySet().toArray(new String[0]),
        (dialog, which) -> {
          optionHandlers[which].onOptionSelected();
          this.reset();
        }).setOnCancelListener(
        dialog -> {
          this.reset();
        }
      )
      .create();
  }

  @ReactMethod
  public void setMessage(final @NonNull String message) {
    this.optionsDialog.setMessage(message);
  }

  @ReactMethod
  public void showDialog() {
    this.optionsDialog.show();
  }

  @ReactMethod
  public void setPositiveButton(final @NonNull String title) {
    this.optionsDialog
      .setButton(
        DialogInterface.BUTTON_POSITIVE,
        title,
        (dialog, which) -> {
          this.eventEmitter("RNAD-onPositivePress", null);
          this.reset();
        }
      );
  }

  @ReactMethod
  public void setNegativeButton(final @NonNull String title) {
    this.optionsDialog
      .setButton(
        DialogInterface.BUTTON_NEGATIVE,
        title,
        (dialog, which) -> {
          this.eventEmitter("RNAD-onNegativePress", null);
          this.reset();
        }
      );
  }

  @ReactMethod
  public void setNeutralButton(final @NonNull String title) {
    this.optionsDialog
      .setButton(
        DialogInterface.BUTTON_NEUTRAL,
        title,
        (dialog, which) -> {
          this.eventEmitter("RNAD-onNeutralPress", null);
          this.reset();
        }
      );
  }

  @ReactMethod
  public void setMenuTitle(final @NonNull String menuTitle) {
    this.optionsDialog.setTitle(menuTitle);
  }

  @ReactMethod
  public void addMenuOption(final String buttonTitle) {
    this.options.put(buttonTitle, eventBinding(buttonTitle));
  }

  private OptionHandler eventBinding(final String title) {
    return () -> {
      WritableMap data = Arguments.createMap();
      data.putString("title", title);

      this.eventEmitter("RNAD-didPressMenuOption", data);
    };
  }

  private void reset() {
    this.eventEmitter("RNAD-onClose", null);
    optionsDialog = null;
    this.options.clear();
  }

  private void eventEmitter(@NonNull final String eventName, @Nullable final Object data) {
    ReactApplicationContext reactApplicationContext =
      getReactApplicationContextIfActiveOrWarn();

    if (reactApplicationContext != null) {
      reactApplicationContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, data);
    }
  }

  @Override
    @NonNull
    public String getName() {
        return NAME;
    }
}
