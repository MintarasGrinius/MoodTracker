import { createContext, useEffect } from 'react';
import React from 'react';
import { MoodOptionType, MoodOptionWithTimeStamp } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppData = {
  moodList: MoodOptionWithTimeStamp[];
};

const dataKey = 'my-app-data';

const setAppData = async (appData: AppData) => {
  try {
    await AsyncStorage.setItem(dataKey, JSON.stringify(appData));
  } catch {}
};

const getAppData = async (): Promise<AppData> => {
  try {
    const appDataString = await AsyncStorage.getItem(dataKey);
    if (appDataString) {
      return JSON.parse(appDataString);
    }
  } catch {}
  return {
    moodList: [],
  };
};

type AppContextType = {
  moodList: MoodOptionWithTimeStamp[];
  handleSelectMood: (selectedMood: MoodOptionType) => void;
};

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
});

type AppProviderType = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderType> = ({
  children,
}: AppProviderType) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimeStamp[]>([]);

  const handleSelectMood = React.useCallback((selectedMood: MoodOptionType) => {
    setMoodList(current => {
      const newMoodList = [
        ...current,
        { mood: selectedMood, timestamp: Date.now() },
      ];

      setAppData({ moodList: newMoodList });

      return newMoodList;
    });
  }, []);

  useEffect(() => {
    getAppData().then(appData => {
      setMoodList(appData.moodList);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        moodList,
        handleSelectMood,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
