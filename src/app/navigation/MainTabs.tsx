import React, {useEffect} from 'react';
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
import {HomeScreen} from '@features/home/screens/HomeScreen';
import {AboutScreen} from '@features/about/screens/AboutScreen';
import {SettingsScreen} from '@features/settings/screens/SettingsScreen';
import {ProfileScreen} from '@features/settings/screens/ProfileScreen';

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
