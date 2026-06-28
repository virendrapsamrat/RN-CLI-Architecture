import {appConfig} from '@app/config';

export type FeatureFlagKey =
  | 'biometric_login'
  | 'dark_mode'
  | 'offline_queue'
  | 'new_home_ui';

type FeatureFlags = Record<FeatureFlagKey, boolean>;

const defaultFlags: FeatureFlags = {
  biometric_login: true,
  dark_mode: true,
  offline_queue: true,
  new_home_ui: false,
};

class FeatureFlagService {
  private flags: FeatureFlags = {...defaultFlags};
  private remoteLoaded = false;

  /** Remote Config adapter — fetch from Firebase Remote Config / LaunchDarkly */
  async loadRemoteFlags(): Promise<void> {
    if (this.remoteLoaded) {
      return;
    }
    // const remote = await remoteConfigService.fetch();
    this.remoteLoaded = true;
  }

  isEnabled(key: FeatureFlagKey): boolean {
    return this.flags[key] ?? false;
  }

  setFlag(key: FeatureFlagKey, value: boolean): void {
    this.flags[key] = value;
  }

  getAll(): FeatureFlags {
    return {...this.flags};
  }

  isDevOverrideEnabled(): boolean {
    return appConfig.env === 'development';
  }
}

export const featureFlagService = new FeatureFlagService();
