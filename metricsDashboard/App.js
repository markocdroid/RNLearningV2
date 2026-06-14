import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { BarChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-gifted-charts';
import axios from 'axios';

export default function App() {
  const screenWidth = Dimensions.get('window').width;

  // 1. Fix: Initialize categoryData as a completely empty array, not [{}]
  const [dailyUsageData, setDailyUsageData] = useState({ values: [], labels: [] });
  const [weeklyUsageData, setWeeklyUsageData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [categoryData, setCategoryData] = useState([]); // Fixed here
  const [featuresData, setFeaturesData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Run all fetches parallelly 
        await Promise.all([
          fetchDailyUsageMetrics(),
          fetchWeeklyUsageData(),
          fetchCategoryData(),
          fetchfeaturesData()
        ]);
      } catch (e) {
        console.log("Error loading data", e);
      } finally {
        setLoading(false); // Data is ready!
      }
    };
    fetchAllData();
  }, []);

  const fetchDailyUsageMetrics = async () => {
    const response = await axios.get('https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/ZA40HNE2G0l7ZUgnq5VO4Q/dataoveraweek.json');
    setDailyUsageData(response.data);
  };

  const fetchWeeklyUsageData = async () => {
    const response = await axios.get('https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/4vOv2DroCvrpvIqvHjRq3w/weeklydata.json');
    setWeeklyUsageData(response.data);
  };

  const fetchCategoryData = async () => {
    const response = await axios.get('https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/Q4E2g7pKaK__9XII3C1GEQ/socialmedia.json');
    
    let getRandomHexColor = () => {
      const randomNum = Math.floor(Math.random() * 16777215);
      return `#${randomNum.toString(16).padStart(6, '0')}`;
    };

    let dataRetrieved = response.data;
    dataRetrieved.forEach((data) => {
      data.color = getRandomHexColor();
      data.legendFontColor = '#7F7F7F';
      data.legendFontSize = 12;
    });
    setCategoryData(dataRetrieved);
  };

  const fetchfeaturesData = async () => {
    const response = await axios.get('https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/tY7RUI7a7CsHkyatn10gJQ/progress-chart%20-1-');
    setFeaturesData(response.data);
  };

  // 2. Fix: Guard condition. If data isn't loaded yet, show a loader instead of rendering broken SVGs
  if (loading || categoryData.length === 0 || weeklyUsageData.datasets[0].data.length === 0) {
    return (
      <View style={[styles.scrollView, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={{ marginTop: 10 }}>Loading Charts...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, marginVertical: 8 }}>Daily App Usage</Text>

        <LineChart
          data={dailyUsageData.values}
          width={300}
          height={200}
          initialSpacing={20}
          color="#1e90ff"
          thickness={2}
          hideDataPoints={false}
          dataPointsColor="#ff6347"
          dataPointsRadius={4}
          startFillColor="#add8e6"
          endFillColor="#ffffff"
          startOpacity={0.8}
          endOpacity={0.1}
          curved={true}
          showVerticalLines={true}
          verticalLinesColor="rgba(0, 0, 0, 0.1)"
          showYAxisIndices={true}
          yAxisColor="rgba(0, 0, 0, 0.1)"
          xAxisLabelTextStyle={styles.labelTextStyle}
          yAxisLabelTextStyle={styles.labelTextStyle}
          yAxisTextStyle={{ color: '#333', fontSize: 12 }}
          xAxisThickness={1}
          xAxisColor="black"
          xAxisLabelTexts={dailyUsageData.labels}
        />

        <BarChart
          data={weeklyUsageData}
          width={screenWidth - 32}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          showValuesOnTopOfBars="true"
          fromZero={true}
          chartConfig={{
            backgroundGradientFrom: '#8ccf9e',
            backgroundGradientTo: '#8ccf9e',
            decimalPlaces: 0,
            color: (opacity = 0) => `rgba(0, 0, 0, 1)`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />

        <Text style={{ fontSize: 18, marginVertical: 8 }}>
          App Usage by Category
        </Text>
        <PieChart
          data={categoryData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={{ marginVertical: 8, borderRadius: 16 }}
        />

        <Text style={{ fontSize: 18, marginVertical: 8 }}>
          Feature Completion Progress
        </Text>
        <ProgressChart
          data={featuresData}
          width={screenWidth - 32}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundGradientFrom: '#8ccf9e',
            backgroundGradientTo: '#8ccf9e',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },
});