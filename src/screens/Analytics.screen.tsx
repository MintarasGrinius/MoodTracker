import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface Props {}

export const Analytics: React.FC = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Text>Analytics.screen.tsx</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
