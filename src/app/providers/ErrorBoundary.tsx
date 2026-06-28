import React, {Component, ErrorInfo, ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@components/atoms/Text/Text';
import {Button} from '@components/atoms/Button/Button';
import {logger} from '@app/logger';
import {AppError, ApiErrorCode} from '@shared/helpers/errorHandler';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {hasError: false, error: null};

  static getDerivedStateFromError(error: Error): State {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logger.error('Unhandled error caught by ErrorBoundary', {
      error: error.message,
      stack: info.componentStack,
    });
  }

  private handleRetry = (): void => {
    this.setState({hasError: false, error: null});
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const message =
        this.state.error instanceof AppError
          ? this.state.error.message
          : 'An unexpected error occurred';

      return (
        <View style={styles.container} accessibilityRole="alert">
          <Text variant="h2">Oops!</Text>
          <Text variant="body" style={styles.message}>
            {message}
          </Text>
          {this.state.error instanceof AppError &&
            this.state.error.code === ApiErrorCode.NETWORK && (
              <Text variant="caption">Please check your internet connection.</Text>
            )}
          <Button title="Try Again" onPress={this.handleRetry} style={styles.button} />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
  },
});
