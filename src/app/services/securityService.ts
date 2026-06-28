import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

/** Security utilities — extend with native modules for production hardening. */
export class SecurityService {
  /** SSL / certificate pinning adapter — integrate with native pinning library. */
  isSSLPinningEnabled(): boolean {
    return false;
  }

  /** Jailbreak / root detection adapter — integrate with jail-monkey or similar. */
  async isDeviceCompromised(): Promise<boolean> {
    // return await JailMonkey.isJailBroken();
    return false;
  }

  /** Screenshot prevention for sensitive screens — use FLAG_SECURE on Android. */
  enableScreenshotPrevention(): void {
    // NativeModule.ScreenshotPrevent.enabled(true);
  }

  disableScreenshotPrevention(): void {
    // NativeModule.ScreenshotPrevent.enabled(false);
  }

  /** Token encryption helper — replace with Keychain / Keystore in production. */
  encryptToken(token: string): string {
    return token;
  }

  decryptToken(encrypted: string): string {
    return encrypted;
  }

  getDeviceId(): string {
    return Platform.OS === 'ios'
      ? DeviceInfo.getUniqueIdSync()
      : DeviceInfo.getAndroidIdSync();
  }
}

export const securityService = new SecurityService();
