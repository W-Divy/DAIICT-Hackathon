import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Text,
  Chip,
  Avatar,
  List,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme/theme';

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalReports: 156,
    thisMonth: 23,
    points: 1250,
    rank: 5,
  });

  const [recentReports] = useState([
    {
      id: 1,
      type: 'Illegal Cutting',
      location: 'Mangrove Bay',
      timestamp: '2 hours ago',
      status: 'Under Review',
      severity: 'High',
    },
    {
      id: 2,
      type: 'Pollution',
      location: 'Coastal Area',
      timestamp: '1 day ago',
      status: 'Confirmed',
      severity: 'Medium',
    },
    {
      id: 3,
      type: 'Land Reclamation',
      location: 'Delta Region',
      timestamp: '3 days ago',
      status: 'Investigation',
      severity: 'High',
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return theme.colors.error;
      case 'Medium':
        return theme.colors.warning;
      case 'Low':
        return theme.colors.success;
      default:
        return theme.colors.info;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return theme.colors.success;
      case 'Under Review':
        return theme.colors.warning;
      case 'Investigation':
        return theme.colors.info;
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Title style={styles.headerTitle}>Mangrove Guardian</Title>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.points}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>#{stats.rank}</Text>
              <Text style={styles.statLabel}>Rank</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Quick Actions */}
        <Card style={styles.quickActionsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Quick Actions</Title>
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Report')}
                style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                icon="plus-circle"
              >
                Report Incident
              </Button>
              <Button
                mode="outlined"
                onPress={() => navigation.navigate('Reports')}
                style={styles.actionButton}
                icon="clipboard-list"
              >
                View Reports
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Statistics */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>This Month</Title>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Icon name="file-document" size={32} color={theme.colors.primary} />
                <Text style={styles.statCardNumber}>{stats.thisMonth}</Text>
                <Text style={styles.statCardLabel}>Reports</Text>
              </View>
              <View style={styles.statCard}>
                <Icon name="trending-up" size={32} color={theme.colors.success} />
                <Text style={styles.statCardNumber}>+15%</Text>
                <Text style={styles.statCardLabel}>Growth</Text>
              </View>
              <View style={styles.statCard}>
                <Icon name="shield-check" size={32} color={theme.colors.info} />
                <Text style={styles.statCardNumber}>89%</Text>
                <Text style={styles.statCardLabel}>Accuracy</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Recent Reports */}
        <Card style={styles.recentReportsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Recent Reports</Title>
            {recentReports.map((report) => (
              <List.Item
                key={report.id}
                title={report.type}
                description={`${report.location} • ${report.timestamp}`}
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="alert-circle"
                    style={{ backgroundColor: getSeverityColor(report.severity) }}
                  />
                )}
                right={() => (
                  <View style={styles.reportStatus}>
                    <Chip
                      mode="outlined"
                      textStyle={{ color: getStatusColor(report.status) }}
                      style={{ borderColor: getStatusColor(report.status) }}
                    >
                      {report.status}
                    </Chip>
                  </View>
                )}
                style={styles.reportItem}
              />
            ))}
            <Button
              mode="text"
              onPress={() => navigation.navigate('Reports')}
              style={styles.viewAllButton}
            >
              View All Reports
            </Button>
          </Card.Content>
        </Card>

        {/* Mission Progress */}
        <Card style={styles.missionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Mission Progress</Title>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '75%' }]} />
              </View>
              <Text style={styles.progressText}>75% Complete</Text>
            </View>
            <Text style={styles.missionText}>
              Help us reach 200 verified reports this month to unlock the "Mangrove Protector" badge!
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  welcomeText: {
    color: theme.colors.surface,
    fontSize: 16,
    opacity: 0.9,
  },
  headerTitle: {
    color: theme.colors.surface,
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: theme.spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: theme.spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: theme.colors.surface,
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: theme.colors.surface,
    fontSize: 14,
    opacity: 0.8,
  },
  content: {
    padding: theme.spacing.lg,
  },
  quickActionsCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
    color: theme.colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  statsCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statCardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: theme.spacing.sm,
  },
  statCardLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  recentReportsCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  reportItem: {
    paddingVertical: theme.spacing.sm,
  },
  reportStatus: {
    justifyContent: 'center',
  },
  viewAllButton: {
    marginTop: theme.spacing.md,
  },
  missionCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  progressContainer: {
    marginBottom: theme.spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.background,
    borderRadius: 4,
    marginBottom: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
    textAlign: 'center',
  },
  missionText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HomeScreen;
