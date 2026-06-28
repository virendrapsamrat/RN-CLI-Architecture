import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {NAVIGATION} from '@app/constants';
import {useTheme} from '@app/providers/ThemeProvider';
import {MainTabParamList} from '@app/navigation/types';
import {Text} from '@components/atoms/Text/Text';

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

interface AnimatedTabIconProps {
  name: TabIconName;
  focused: boolean;
  color: string;
  size: number;
}

const AnimatedTabIcon: React.FC<AnimatedTabIconProps> = ({
  name,
  focused,
  color,
  size,
}) => {
  const scale = useSharedValue(focused ? 1.15 : 1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.15 : 1, {damping: 12, stiffness: 180});
  }, [focused, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
};

const TabScreenLayout: React.FC<{titleKey: string; bodyKey: string}> = ({
  titleKey,
  bodyKey,
}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  return (
    <View style={[styles.screen, {backgroundColor: theme.colors.background}]}>
      <Text variant="h2">{t(titleKey)}</Text>
      <Text variant="body" color={theme.colors.textSecondary}>
        {t(bodyKey)}
      </Text>
    </View>
  );
};

const HomeScreen = () => <TabScreenLayout titleKey="home.title" bodyKey="home.welcome" />;

const AboutScreen = () => (
  <TabScreenLayout titleKey="about.title" bodyKey="about.description" />
);

const SettingsScreen = () => (
  <TabScreenLayout titleKey="settings.title" bodyKey="settings.theme" />
);

const ProfileScreen = () => (
  <TabScreenLayout titleKey="profile.title" bodyKey="profile.editProfile" />
);

const tabIcons: Record<
  keyof MainTabParamList,
  {focused: TabIconName; unfocused: TabIconName}
> = {
  [NAVIGATION.HOME]: {focused: 'home', unfocused: 'home-outline'},
  [NAVIGATION.ABOUT]: {
    focused: 'information-circle',
    unfocused: 'information-circle-outline',
  },
  [NAVIGATION.SETTINGS]: {focused: 'settings', unfocused: 'settings-outline'},
  [NAVIGATION.PROFILE]: {focused: 'person', unfocused: 'person-outline'},
};

export const MainTabs = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar,
          borderTopColor: theme.colors.tabBarBorder,
        },
        tabBarIcon: ({focused, color, size}) => {
          const icons = tabIcons[route.name];
          const iconName = focused ? icons.focused : icons.unfocused;
          return (
            <AnimatedTabIcon
              name={iconName}
              focused={focused}
              color={color}
              size={size}
            />
          );
        },
      })}>
      <Tab.Screen
        name={NAVIGATION.HOME}
        component={HomeScreen}
        options={{tabBarLabel: t('tabs.home')}}
      />
      <Tab.Screen
        name={NAVIGATION.ABOUT}
        component={AboutScreen}
        options={{tabBarLabel: t('tabs.about')}}
      />
      <Tab.Screen
        name={NAVIGATION.SETTINGS}
        component={SettingsScreen}
        options={{tabBarLabel: t('tabs.settings')}}
      />
      <Tab.Screen
        name={NAVIGATION.PROFILE}
        component={ProfileScreen}
        options={{tabBarLabel: t('tabs.profile')}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
});
