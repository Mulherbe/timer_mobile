import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import AnalogClock from 'react-native-clock-analog';

export default function Clock() {
  return (
    <View style={styles.container}>
        <View style={{ marginBottom: 5 }} />
        <AnalogClock
          colorClock="white"
          colorNumber="black"
          colorCenter="white"
          colorHour="black"
          colorMinutes="black"
          autostart={true}
          showSeconds
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});