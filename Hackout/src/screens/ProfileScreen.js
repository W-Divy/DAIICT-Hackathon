import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Text,
  Avatar,
  Button,
  List,
  Switch,
  Divider,
  Portal,
  Modal,
  TextInput,
  Chip,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme/theme';

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=JD',
    joinDate: 'March 2024',
    level: 'Intermediate',
    badge: 'Mangrove Monitor',
    totalReports: 16,
    verifiedReports: 14,
    totalPoints: 2150,
    accuracy: 85,
    rank: 5,
  });

  const [editForm, setEditForm] = useState({
    name: userData.name,
    email: userData.email,
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.replace('Login'),
        },
      ]
    );
  };

  const handleEditProfile = () => {
    setEditForm({
      name: userData.name,
      email: userData.email,
    });
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    setUserData(prev => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
    }));
    setShowEditModal(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

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

  const menuItems = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      subtitle: 'Receive alerts for new reports and updates',
      icon: 'bell-outline',
      right: () => (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          color={theme.colors.primary}
        />
      ),
    },
    {
      id: 'location',
      title: 'Location Sharing',
      subtitle: 'Share location for accurate incident reporting',
      icon: 'map-marker-outline',
      right: () => (
        <Switch
          value={locationSharing}
          onValueChange={setLocationSharing}
          color={theme.colors.primary}
        />
      ),
    },
    {
      id: 'privacy',
      title: 'Privacy Settings',
      subtitle: 'Manage your data and privacy preferences',
      icon: 'shield-account-outline',
      onPress: () => Alert.alert('Privacy Settings', 'Privacy settings screen coming soon'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'Get help and contact support team',
      icon: 'help-circle-outline',
      onPress: () => Alert.alert('Help & Support', 'Help and support screen coming soon'),
    },
    {
      id: 'about',
      title: 'About App',
      subtitle: 'Version 1.0.0 • Learn more about the app',
      icon: 'information-outline',
      onPress: () => Alert.alert('About App', 'Mangrove Monitor v1.0.0\n\nProtect our coastal ecosystems together!'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header with Profile Info */}
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Avatar.Image
            size={120}
            source={{ uri: userData.avatar }}
            style={styles.profileAvatar}
          />
          
          <Title style={styles.profileName}>{userData.name}</Title>
          <Text style={styles.profileEmail}>{userData.email}</Text>
          
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.totalReports}</Text>
              <Text style={styles.statLabel}>Reports</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.totalPoints}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.accuracy}%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
          </View>

          <Button
            mode="outlined"
            onPress={handleEditProfile}
            style={styles.editButton}
            textColor={theme.colors.surface}
            buttonColor="transparent"
          >
            Edit Profile
          </Button>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* User Level and Badge */}
        <Card style={styles.levelCard}>
          <Card.Content>
            <View style={styles.levelHeader}>
              <View style={styles.levelInfo}>
                <Title style={styles.levelTitle}>Level {userData.level}</Title>
                <Text style={styles.levelSubtitle}>Member since {userData.joinDate}</Text>
              </View>
              <View style={styles.levelIcon}>
                <Icon name="star" size={32} color={getLevelColor(userData.level)} />
              </View>
            </View>
            
            <View style={styles.badgeContainer}>
              <Chip
                mode="outlined"
                textStyle={{ color: getBadgeColor(userData.badge) }}
                style={{ borderColor: getBadgeColor(userData.badge) }}
                icon="medal"
              >
                {userData.badge}
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Detailed Statistics */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Your Statistics</Title>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Icon name="file-document" size={24} color={theme.colors.primary} />
                <Text style={styles.statCardNumber}>{userData.totalReports}</Text>
                <Text style={styles.statCardLabel}>Total Reports</Text>
              </View>
              
              <View style={styles.statCard}>
                <Icon name="check-circle" size={24} color={theme.colors.success} />
                <Text style={styles.statCardNumber}>{userData.verifiedReports}</Text>
                <Text style={styles.statCardLabel}>Verified</Text>
              </View>
              
              <View style={styles.statCard}>
                <Icon name="trophy" size={24} color={theme.colors.warning} />
                <Text style={styles.statCardNumber}>#{userData.rank}</Text>
                <Text style={styles.statCardLabel}>Rank</Text>
              </View>
              
              <View style={styles.statCard}>
                <Icon name="target" size={24} color={theme.colors.info} />
                <Text style={styles.statCardNumber}>{userData.accuracy}%</Text>
                <Text style={styles.statCardLabel}>Accuracy</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Recent Activity */}
        <Card style={styles.activityCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Recent Activity</Title>
            
            <List.Item
              title="Report Submitted"
              description="Illegal cutting incident in Mangrove Bay"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="plus-circle"
                  style={{ backgroundColor: theme.colors.primary }}
                />
              )}
              right={() => <Text style={styles.activityTime}>2 hours ago</Text>}
            />
            
            <Divider />
            
            <List.Item
              title="Points Earned"
              description="Report verified and points awarded"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="check-circle"
                  style={{ backgroundColor: theme.colors.success }}
                />
              )}
              right={() => <Text style={styles.activityTime}>1 day ago</Text>}
            />
            
            <Divider />
            
            <List.Item
              title="Badge Unlocked"
              description="First Report achievement unlocked"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="medal"
                  style={{ backgroundColor: theme.colors.warning }}
                />
              )}
              right={() => <Text style={styles.activityTime}>3 days ago</Text>}
            />
          </Card.Content>
        </Card>

        {/* Settings Menu */}
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Settings</Title>
            
            {menuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <List.Item
                  title={item.title}
                  description={item.subtitle}
                  left={(props) => (
                    <List.Icon {...props} icon={item.icon} color={theme.colors.primary} />
                  )}
                  right={item.right}
                  onPress={item.onPress}
                  style={styles.menuItem}
                />
                {index < menuItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          textColor={theme.colors.error}
          buttonColor="transparent"
          icon="logout"
        >
          Logout
        </Button>
      </View>

      {/* Edit Profile Modal */}
      <Portal>
        <Modal
          visible={showEditModal}
          onDismiss={() => setShowEditModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>Edit Profile</Title>
          
          <TextInput
            label="Name"
            value={editForm.name}
            onChangeText={(text) => setEditForm(prev => ({ ...prev, name: text }))}
            mode="outlined"
            style={styles.modalInput}
          />
          
          <TextInput
            label="Email"
            value={editForm.email}
            onChangeText={(text) => setEditForm(prev => ({ ...prev, email: text }))}
            mode="outlined"
            style={styles.modalInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={() => setShowEditModal(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSaveProfile}
              style={[styles.modalButton, { backgroundColor: theme.colors.primary }]}
            >
              Save
            </Button>
          </View>
        </Modal>
      </Portal>
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
  profileAvatar: {
    marginBottom: theme.spacing.lg,
    borderWidth: 4,
    borderColor: theme.colors.surface,
  },
  profileName: {
    color: theme.colors.surface,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  profileEmail: {
    color: theme.colors.surface,
    fontSize: 16,
    opacity: 0.9,
    marginBottom: theme.spacing.lg,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: theme.colors.surface,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: theme.colors.surface,
    fontSize: 12,
    opacity: 0.8,
  },
  editButton: {
    borderColor: theme.colors.surface,
  },
  content: {
    padding: theme.spacing.lg,
  },
  levelCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  levelSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  levelIcon: {
    marginLeft: theme.spacing.md,
  },
  badgeContainer: {
    alignItems: 'center',
  },
  statsCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
    color: theme.colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    width: '48%',
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
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
    textAlign: 'center',
  },
  activityCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  activityTime: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  settingsCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  menuItem: {
    paddingVertical: theme.spacing.sm,
  },
  logoutButton: {
    borderColor: theme.colors.error,
    marginBottom: theme.spacing.xxl,
  },
  modalContainer: {
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
    color: theme.colors.text,
    textAlign: 'center',
  },
  modalInput: {
    marginBottom: theme.spacing.md,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
});

export default ProfileScreen;
