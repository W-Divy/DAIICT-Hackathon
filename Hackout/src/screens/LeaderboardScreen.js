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
  Text,
  Avatar,
  List,
  Chip,
  Button,
  SegmentedButtons,
  LinearProgress,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme/theme';

const LeaderboardScreen = ({ navigation }) => {
  const [timeFilter, setTimeFilter] = useState('month');
  const [refreshing, setRefreshing] = useState(false);
  const [userRank, setUserRank] = useState(5);

  const [leaderboardData] = useState([
    {
      id: 1,
      name: 'Sarah Wilson',
      points: 2840,
      reports: 23,
      accuracy: 95,
      rank: 1,
      avatar: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=SW',
      badge: 'Mangrove Protector',
      level: 'Expert',
    },
    {
      id: 2,
      name: 'Mike Johnson',
      points: 2650,
      reports: 21,
      accuracy: 92,
      rank: 2,
      avatar: 'https://via.placeholder.com/60x60/2196F3/FFFFFF?text=MJ',
      badge: 'Coastal Guardian',
      level: 'Expert',
    },
    {
      id: 3,
      name: 'Emma Davis',
      points: 2480,
      reports: 19,
      accuracy: 89,
      rank: 3,
      avatar: 'https://via.placeholder.com/60x60/FF9800/FFFFFF?text=ED',
      badge: 'Eco Warrior',
      level: 'Advanced',
    },
    {
      id: 4,
      name: 'Alex Chen',
      points: 2320,
      reports: 18,
      accuracy: 87,
      rank: 4,
      avatar: 'https://via.placeholder.com/60x60/9C27B0/FFFFFF?text=AC',
      badge: 'Nature Defender',
      level: 'Advanced',
    },
    {
      id: 5,
      name: 'You',
      points: 2150,
      reports: 16,
      accuracy: 85,
      rank: 5,
      avatar: 'https://via.placeholder.com/60x60/607D8B/FFFFFF?text=YO',
      badge: 'Mangrove Monitor',
      level: 'Intermediate',
      isCurrentUser: true,
    },
    {
      id: 6,
      name: 'Lisa Brown',
      points: 1980,
      reports: 15,
      accuracy: 83,
      rank: 6,
      avatar: 'https://via.placeholder.com/60x60/E91E63/FFFFFF?text=LB',
      badge: 'Coastal Watcher',
      level: 'Intermediate',
    },
    {
      id: 7,
      name: 'David Kim',
      points: 1820,
      reports: 14,
      accuracy: 81,
      rank: 7,
      avatar: 'https://via.placeholder.com/60x60/795548/FFFFFF?text=DK',
      badge: 'Eco Scout',
      level: 'Beginner',
    },
    {
      id: 8,
      name: 'Maria Garcia',
      points: 1680,
      reports: 13,
      accuracy: 79,
      rank: 8,
      avatar: 'https://via.placeholder.com/60x60/3F51B5/FFFFFF?text=MG',
      badge: 'Nature Observer',
      level: 'Beginner',
    },
  ]);

  const [achievements] = useState([
    {
      id: 1,
      name: 'First Report',
      description: 'Submit your first mangrove incident report',
      icon: 'file-document-plus',
      unlocked: true,
      progress: 100,
      points: 50,
    },
    {
      id: 2,
      name: 'Photo Expert',
      description: 'Submit 10 reports with clear photo evidence',
      icon: 'camera',
      unlocked: false,
      progress: 60,
      points: 100,
    },
    {
      id: 3,
      name: 'Mangrove Protector',
      description: 'Submit 20 verified reports',
      icon: 'shield-check',
      unlocked: false,
      progress: 80,
      points: 200,
    },
    {
      id: 4,
      name: 'Accuracy Master',
      description: 'Maintain 90%+ accuracy for 30 days',
      icon: 'target',
      unlocked: false,
      progress: 75,
      points: 150,
    },
    {
      id: 5,
      name: 'Community Leader',
      description: 'Help 5 other users submit their first reports',
      icon: 'account-group',
      unlocked: false,
      progress: 40,
      points: 300,
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert':
        return theme.colors.error;
      case 'Advanced':
        return theme.colors.warning;
      case 'Intermediate':
        return theme.colors.primary;
      case 'Beginner':
        return theme.colors.info;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getBadgeColor = (badge) => {
    const badgeColors = {
      'Mangrove Protector': theme.colors.primary,
      'Coastal Guardian': theme.colors.ocean,
      'Eco Warrior': theme.colors.success,
      'Nature Defender': theme.colors.mangrove,
      'Mangrove Monitor': theme.colors.secondary,
      'Coastal Watcher': theme.colors.info,
      'Eco Scout': theme.colors.warning,
      'Nature Observer': theme.colors.sand,
    };
    return badgeColors[badge] || theme.colors.textSecondary;
  };

  const getCurrentUserData = () => {
    return leaderboardData.find(user => user.isCurrentUser);
  };

  const currentUser = getCurrentUserData();

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header with Current User Stats */}
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Title style={styles.headerTitle}>Leaderboard</Title>
          <Text style={styles.headerSubtitle}>
            Compete with other mangrove protectors
          </Text>
          
          {currentUser && (
            <Card style={styles.userStatsCard}>
              <Card.Content style={styles.userStatsContent}>
                <View style={styles.userRankSection}>
                  <Text style={styles.userRankText}>#{currentUser.rank}</Text>
                  <Text style={styles.userRankLabel}>Your Rank</Text>
                </View>
                <View style={styles.userPointsSection}>
                  <Text style={styles.userPointsText}>{currentUser.points}</Text>
                  <Text style={styles.userPointsLabel}>Points</Text>
                </View>
                <View style={styles.userAccuracySection}>
                  <Text style={styles.userAccuracyText}>{currentUser.accuracy}%</Text>
                  <Text style={styles.userAccuracyLabel}>Accuracy</Text>
                </View>
              </Card.Content>
            </Card>
          )}
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Time Filter */}
        <Card style={styles.filterCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Time Period</Title>
            <SegmentedButtons
              value={timeFilter}
              onValueChange={setTimeFilter}
              buttons={[
                { value: 'week', label: 'Week' },
                { value: 'month', label: 'Month' },
                { value: 'year', label: 'Year' },
                { value: 'all', label: 'All Time' },
              ]}
              style={styles.segmentedButtons}
            />
          </Card.Content>
        </Card>

        {/* Top 3 Podium */}
        <Card style={styles.podiumCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Top Performers</Title>
            <View style={styles.podiumContainer}>
              {/* 2nd Place */}
              <View style={[styles.podiumItem, styles.secondPlace]}>
                <View style={styles.podiumRank}>2</View>
                <Avatar.Image
                  size={60}
                  source={{ uri: leaderboardData[1].avatar }}
                  style={styles.podiumAvatar}
                />
                <Text style={styles.podiumName}>{leaderboardData[1].name}</Text>
                <Text style={styles.podiumPoints}>{leaderboardData[1].points} pts</Text>
                <Chip
                  mode="outlined"
                  textStyle={{ color: getBadgeColor(leaderboardData[1].badge) }}
                  style={{ borderColor: getBadgeColor(leaderboardData[1].badge) }}
                  style={styles.podiumBadge}
                >
                  {leaderboardData[1].badge}
                </Chip>
              </View>

              {/* 1st Place */}
              <View style={[styles.podiumItem, styles.firstPlace]}>
                <View style={styles.podiumRank}>1</View>
                <Avatar.Image
                  size={80}
                  source={{ uri: leaderboardData[0].avatar }}
                  style={styles.podiumAvatar}
                />
                <Text style={styles.podiumName}>{leaderboardData[0].name}</Text>
                <Text style={styles.podiumPoints}>{leaderboardData[0].points} pts</Text>
                <Chip
                  mode="outlined"
                  textStyle={{ color: getBadgeColor(leaderboardData[0].badge) }}
                  style={{ borderColor: getBadgeColor(leaderboardData[0].badge) }}
                  style={styles.podiumBadge}
                >
                  {leaderboardData[0].badge}
                </Chip>
                <Icon name="crown" size={24} color="#FFD700" style={styles.crownIcon} />
              </View>

              {/* 3rd Place */}
              <View style={[styles.podiumItem, styles.thirdPlace]}>
                <View style={styles.podiumRank}>3</View>
                <Avatar.Image
                  size={60}
                  source={{ uri: leaderboardData[2].avatar }}
                  style={styles.podiumAvatar}
                />
                <Text style={styles.podiumName}>{leaderboardData[2].name}</Text>
                <Text style={styles.podiumPoints}>{leaderboardData[2].points} pts</Text>
                <Chip
                  mode="outlined"
                  textStyle={{ color: getBadgeColor(leaderboardData[2].badge) }}
                  style={{ borderColor: getBadgeColor(leaderboardData[2].badge) }}
                  style={styles.podiumBadge}
                >
                  {leaderboardData[2].badge}
                </Chip>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Full Leaderboard */}
        <Card style={styles.leaderboardCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Full Rankings</Title>
            {leaderboardData.map((user, index) => (
              <List.Item
                key={user.id}
                title={user.name}
                description={`${user.reports} reports • ${user.accuracy}% accuracy`}
                left={(props) => (
                  <View style={styles.rankContainer}>
                    <Text style={styles.rankNumber}>#{user.rank}</Text>
                    <Avatar.Image
                      {...props}
                      size={50}
                      source={{ uri: user.avatar }}
                      style={[
                        styles.userAvatar,
                        user.isCurrentUser && styles.currentUserAvatar,
                      ]}
                    />
                  </View>
                )}
                right={() => (
                  <View style={styles.userStats}>
                    <Text style={styles.userPoints}>{user.points}</Text>
                    <Text style={styles.userPointsLabel}>points</Text>
                    <Chip
                      mode="outlined"
                      textStyle={{ color: getLevelColor(user.level) }}
                      style={{ borderColor: getLevelColor(user.level) }}
                      style={styles.levelChip}
                    >
                      {user.level}
                    </Chip>
                  </View>
                )}
                style={[
                  styles.leaderboardItem,
                  user.isCurrentUser && styles.currentUserItem,
                ]}
              />
            ))}
          </Card.Content>
        </Card>

        {/* Achievements */}
        <Card style={styles.achievementsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Achievements</Title>
            <Text style={styles.achievementsSubtitle}>
              Unlock badges and earn bonus points
            </Text>
            
            {achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementItem}>
                <View style={styles.achievementIcon}>
                  <Icon
                    name={achievement.icon}
                    size={32}
                    color={achievement.unlocked ? theme.colors.primary : theme.colors.textSecondary}
                  />
                </View>
                
                <View style={styles.achievementContent}>
                  <View style={styles.achievementHeader}>
                    <Text style={styles.achievementName}>{achievement.name}</Text>
                    <Text style={styles.achievementPoints}>+{achievement.points} pts</Text>
                  </View>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                  
                  <View style={styles.achievementProgress}>
                    <LinearProgress
                      progress={achievement.progress / 100}
                      color={achievement.unlocked ? theme.colors.success : theme.colors.primary}
                      style={styles.progressBar}
                    />
                    <Text style={styles.progressText}>{achievement.progress}%</Text>
                  </View>
                </View>
                
                <View style={styles.achievementStatus}>
                  {achievement.unlocked ? (
                    <Icon name="check-circle" size={24} color={theme.colors.success} />
                  ) : (
                    <Icon name="lock" size={24} color={theme.colors.textSecondary} />
                  )}
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* How to Earn Points */}
        <Card style={styles.pointsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>How to Earn Points</Title>
            <View style={styles.pointsList}>
              <View style={styles.pointItem}>
                <Icon name="plus-circle" size={20} color={theme.colors.primary} />
                <Text style={styles.pointText}>Submit a report: +50 points</Text>
              </View>
              <View style={styles.pointItem}>
                <Icon name="check-circle" size={20} color={theme.colors.success} />
                <Text style={styles.pointText}>Report verified: +25 points</Text>
              </View>
              <View style={styles.pointItem}>
                <Icon name="camera" size={20} color={theme.colors.info} />
                <Text style={styles.pointText}>Add photos: +10 points</Text>
              </View>
              <View style={styles.pointItem}>
                <Icon name="map-marker" size={20} color={theme.colors.warning} />
                <Text style={styles.pointText}>Include location: +5 points</Text>
              </View>
              <View style={styles.pointItem}>
                <Icon name="trophy" size={20} color={theme.colors.accent} />
                <Text style={styles.pointText}>Achievement unlocked: +50-300 points</Text>
              </View>
            </View>
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
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    color: theme.colors.surface,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  headerSubtitle: {
    color: theme.colors.surface,
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  userStatsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    width: '100%',
  },
  userStatsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.md,
  },
  userRankSection: {
    alignItems: 'center',
  },
  userRankText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  userRankLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  userPointsSection: {
    alignItems: 'center',
  },
  userPointsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  userPointsLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  userAccuracySection: {
    alignItems: 'center',
  },
  userAccuracyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  userAccuracyLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  content: {
    padding: theme.spacing.lg,
  },
  filterCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
    color: theme.colors.primary,
  },
  segmentedButtons: {
    marginTop: theme.spacing.sm,
  },
  podiumCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingTop: theme.spacing.lg,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  firstPlace: {
    order: 2,
  },
  secondPlace: {
    order: 1,
  },
  thirdPlace: {
    order: 3,
  },
  podiumRank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  podiumAvatar: {
    marginBottom: theme.spacing.sm,
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  podiumPoints: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  podiumBadge: {
    marginBottom: theme.spacing.sm,
  },
  crownIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  leaderboardCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  leaderboardItem: {
    paddingVertical: theme.spacing.sm,
  },
  currentUserItem: {
    backgroundColor: theme.colors.primary + '10',
    borderRadius: theme.borderRadius.md,
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  userAvatar: {
    marginBottom: theme.spacing.xs,
  },
  currentUserAvatar: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  userStats: {
    alignItems: 'flex-end',
  },
  userPoints: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  userPointsLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  levelChip: {
    marginBottom: theme.spacing.xs,
  },
  achievementsCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  achievementsSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  achievementIcon: {
    marginRight: theme.spacing.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  achievementPoints: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  achievementDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
  achievementProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    minWidth: 35,
  },
  achievementStatus: {
    marginLeft: theme.spacing.sm,
  },
  pointsCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  pointsList: {
    gap: theme.spacing.sm,
  },
  pointItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointText: {
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
});

export default LeaderboardScreen;
