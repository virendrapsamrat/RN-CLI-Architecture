# Production Checklist

## Pre-Release

- [ ] Update `.env.production` with production API URLs
- [ ] Enable SSL/Certificate pinning in `SecurityService`
- [ ] Configure Firebase Crashlytics / Sentry
- [ ] Configure Firebase Analytics / Mixpanel / Amplitude
- [ ] Enable ProGuard/R8 for Android release builds
- [ ] Configure iOS code signing and provisioning profiles
- [ ] Set up Firebase App Distribution or TestFlight
- [ ] Run full test suite: `yarn test:coverage` (≥80%)
- [ ] Run type check: `yarn typecheck`
- [ ] Run lint: `yarn lint`
- [ ] Verify deep linking on both platforms
- [ ] Test offline queue and network recovery
- [ ] Test session timeout and token refresh
- [ ] Test biometric login flow
- [ ] Verify accessibility (VoiceOver / TalkBack)
- [ ] Test dark mode and light mode
- [ ] Test English and Spanish localization
- [ ] Verify tablet and landscape layouts
- [ ] Security audit: jailbreak/root detection
- [ ] Review API error handling paths
- [ ] Remove debug logs from production build
- [ ] Update app version and build number
- [ ] Generate release notes

## Performance

- [ ] Enable Hermes (default in RN 0.86)
- [ ] Verify FlashList usage for long lists
- [ ] Verify FastImage caching for remote images
- [ ] Profile with React DevTools / Flipper
- [ ] Check bundle size with `npx react-native bundle --verbose`

## CI/CD

- [ ] GitHub Actions secrets configured
- [ ] Fastlane lanes tested
- [ ] CodePush deployment keys configured (if used)

## App Store / Play Store

- [ ] Privacy policy URL
- [ ] App Store screenshots (phone + tablet)
- [ ] Play Store listing assets
- [ ] Permission usage descriptions in Info.plist / AndroidManifest
