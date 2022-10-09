import * as React from 'react';
import { View } from 'react-native';
import { useAppContext } from '../App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

interface Props {}

export const History: React.FC = ({}: Props) => {
  const appContext = useAppContext();

  return (
    <View>
      {appContext.moodList.map(item => (
        <MoodItemRow key={item.timestamp} item={item} />
      ))}
    </View>
  );
};
