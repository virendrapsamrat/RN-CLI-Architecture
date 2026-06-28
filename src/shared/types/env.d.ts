declare module 'react-native-config' {
  export interface NativeConfig {
    APP_NAME: string;
    ENV: 'development' | 'qa' | 'staging' | 'production';
    API_BASE_URL: string;
    API_TIMEOUT: string;
    ENABLE_ANALYTICS: string;
    ENABLE_CRASH_REPORTING: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-vector-icons/Ionicons' {
  import {Component} from 'react';
  import {TextProps} from 'react-native';

  interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export default class Icon extends Component<IconProps> {}
}
