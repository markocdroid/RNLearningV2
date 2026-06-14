import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BarChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-gifted-charts';
import axios from 'axios';

const Tab = createBottomTabNavigator();
const screenWidth = Dimensions.get('window').width;

function DailyScreen({ data }) {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.chartTitle}>Daily App Usage</Text>
      <LineChart
        data={data.values}
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
        xAxisLabelTexts={data.labels}
      />
    </View>
  );
}

function WeeklyScreen({ data }) {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.chartTitle}>Weekly App Usage</Text>
      <BarChart
        data={data}
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
        style={styles.chartStyle}
      />
    </View>
  );
}

function CategoryScreen({ data }) {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.chartTitle}>App Usage by Category</Text>
      <PieChart
        data={data}
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
        style={styles.chartStyle}
      />
    </View>
  );
}

function FeaturesScreen({ data }) {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.chartTitle}>Feature Completion Progress</Text>
      <ProgressChart
        data={data}
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
        style={styles.chartStyle}
      />
    </View>
  );
}

export default function App() {
  const [dailyUsageData, setDailyUsageData] = useState({ values: [], labels: [] });
  const [weeklyUsageData, setWeeklyUsageData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [categoryData, setCategoryData] = useState([]);
  const [featuresData, setFeaturesData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchDailyUsageMetrics(),
          fetchWeeklyUsageData(),
          fetchCategoryData(),
          fetchfeaturesData(),
        ]);
      } catch (e) {
        console.log('Error loading dashboard data:', e);
      } finally {
        setLoading(false); // Graphs safe to render now
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
    
    const getRandomHexColor = () => {
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

  if (loading || categoryData.length === 0 || weeklyUsageData.datasets[0].data.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={{ marginTop: 10, color: '#333' }}>Loading Application...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Removes default top header bar
          tabBarActiveTintColor: '#1e90ff',
          tabBarInactiveTintColor: '#7f7f7f',
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            backgroundColor: '#ffffff',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen name="Daily">
          {(props) => <DailyScreen {...props} data={dailyUsageData} />}
        </Tab.Screen>

        <Tab.Screen name="Weekly">
          {(props) => <WeeklyScreen {...props} data={weeklyUsageData} />}
        </Tab.Screen>

        <Tab.Screen name="Category">
          {(props) => <CategoryScreen {...props} data={categoryData} />}
        </Tab.Screen>

        <Tab.Screen name="Features">
          {(props) => <FeaturesScreen {...props} data={featuresData} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  chartStyle: {
    borderRadius: 16,
  },
  labelTextStyle: {
    fontSize: 10,
    color: '#333',
  },
});