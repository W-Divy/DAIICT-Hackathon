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
  Chip,
  Avatar,
  List,
  Searchbar,
  Button,
  SegmentedButtons,
  Portal,
  Modal,
  Image,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme/theme';

const ViewReportsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const [reports] = useState([
    {
      id: 1,
      type: 'Illegal Cutting',
      description: 'Large area of mangroves cleared for construction',
      location: 'Mangrove Bay',
      timestamp: '2 hours ago',
      status: 'Under Review',
      severity: 'High',
      reporter: 'John Doe',
      photos: ['https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Mangrove+Cutting'],
      coordinates: { latitude: 12.9716, longitude: 77.5946 },
    },
    {
      id: 2,
      type: 'Pollution',
      description: 'Oil spill detected in coastal waters',
      location: 'Coastal Area',
      timestamp: '1 day ago',
      status: 'Confirmed',
      severity: 'Medium',
      reporter: 'Jane Smith',
      photos: ['https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Oil+Spill'],
      coordinates: { latitude: 12.9716, longitude: 77.5946 },
    },
    {
      id: 3,
      type: 'Land Reclamation',
      description: 'Unauthorized land filling in mangrove area',
      location: 'Delta Region',
      timestamp: '3 days ago',
      status: 'Investigation',
      severity: 'High',
      reporter: 'Mike Johnson',
      photos: ['https://via.placeholder.com/300x200/D32F2F/FFFFFF?text=Land+Reclamation'],
      coordinates: { latitude: 12.9716, longitude: 77.5946 },
    },
    {
      id: 4,
      type: 'Habitat Destruction',
      description: 'Nesting sites destroyed by human activity',
      location: 'Bird Sanctuary',
      timestamp: '5 days ago',
      status: 'Confirmed',
      severity: 'Critical',
      reporter: 'Sarah Wilson',
      photos: ['https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Habitat+Destruction'],
      coordinates: { latitude: 12.9716, longitude: 77.5946 },
    },
  ]);

  const incidentTypes = ['all', 'Illegal Cutting', 'Land Reclamation', 'Pollution', 'Habitat Destruction', 'Illegal Fishing', 'Other'];
  const statusTypes = ['all', 'Under Review', 'Confirmed', 'Investigation', 'Resolved'];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
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
      case 'Critical':
        return theme.colors.error;
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
      case 'Resolved':
        return theme.colors.success;
      default:
        return theme.colors.textSecondary;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const openReportModal = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'check-circle';
      case 'Under Review':
        return 'clock-outline';
      case 'Investigation':
        return 'magnify';
      case 'Resolved':
        return 'check-decagram';
      default:
        return 'help-circle';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Reports</Title>
        <Text style={styles.headerSubtitle}>
          Monitor and track mangrove incidents
        </Text>
      </View>

      <View style={styles.content}>
        {/* Search and Filters */}
        <Card style={styles.filterCard}>
          <Card.Content>
            <Searchbar
              placeholder="Search reports..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
            />
            
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Incident Type:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterChips}>
                  {incidentTypes.map((type) => (
                    <Chip
                      key={type}
                      selected={filterType === type}
                      onPress={() => setFilterType(type)}
                      style={[
                        styles.filterChip,
                        filterType === type && styles.selectedFilterChip,
                      ]}
                      textStyle={[
                        styles.filterChipText,
                        filterType === type && styles.selectedFilterChipText,
                      ]}
                    >
                      {type === 'all' ? 'All Types' : type}
                    </Chip>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Status:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterChips}>
                  {statusTypes.map((status) => (
                    <Chip
                      key={status}
                      selected={filterStatus === status}
                      onPress={() => setFilterStatus(status)}
                      style={[
                        styles.filterChip,
                        filterStatus === status && styles.selectedFilterChip,
                      ]}
                      textStyle={[
                        styles.filterChipText,
                        filterStatus === status && styles.selectedFilterChipText,
                      ]}
                    >
                      {status === 'all' ? 'All Status' : status}
                    </Chip>
                  ))}
                </View>
              </ScrollView>
            </View>
          </Card.Content>
        </Card>

        {/* Reports List */}
        <ScrollView
          style={styles.reportsList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredReports.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <Icon name="file-document-outline" size={64} color={theme.colors.textSecondary} />
                <Title style={styles.emptyTitle}>No Reports Found</Title>
                <Text style={styles.emptyText}>
                  Try adjusting your search criteria or filters
                </Text>
              </Card.Content>
            </Card>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id} style={styles.reportCard}>
                <Card.Content>
                  <View style={styles.reportHeader}>
                    <View style={styles.reportTitleSection}>
                      <Title style={styles.reportTitle}>{report.type}</Title>
                      <Text style={styles.reportLocation}>{report.location}</Text>
                    </View>
                    <View style={styles.reportStatusSection}>
                      <Chip
                        mode="outlined"
                        textStyle={{ color: getStatusColor(report.status) }}
                        style={{ borderColor: getStatusColor(report.status) }}
                        icon={getStatusIcon(report.status)}
                      >
                        {report.status}
                      </Chip>
                    </View>
                  </View>

                  <Text style={styles.reportDescription} numberOfLines={2}>
                    {report.description}
                  </Text>

                  <View style={styles.reportDetails}>
                    <View style={styles.reportDetail}>
                      <Icon name="account" size={16} color={theme.colors.textSecondary} />
                      <Text style={styles.reportDetailText}>{report.reporter}</Text>
                    </View>
                    <View style={styles.reportDetail}>
                      <Icon name="clock-outline" size={16} color={theme.colors.textSecondary} />
                      <Text style={styles.reportDetailText}>{report.timestamp}</Text>
                    </View>
                    <View style={styles.reportDetail}>
                      <Icon name="alert-circle" size={16} color={getSeverityColor(report.severity)} />
                      <Text style={[styles.reportDetailText, { color: getSeverityColor(report.severity) }]}>
                        {report.severity}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.reportActions}>
                    <Button
                      mode="outlined"
                      onPress={() => openReportModal(report)}
                      style={styles.viewButton}
                    >
                      View Details
                    </Button>
                    <Button
                      mode="text"
                      onPress={() => {/* Navigate to map */}}
                      icon="map-marker"
                    >
                      View on Map
                    </Button>
                  </View>
                </Card.Content>
              </Card>
            ))
          )}
        </ScrollView>
      </View>

      {/* Report Detail Modal */}
      <Portal>
        <Modal
          visible={showReportModal}
          onDismiss={() => setShowReportModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedReport && (
            <ScrollView>
              <Title style={styles.modalTitle}>{selectedReport.type}</Title>
              <Text style={styles.modalLocation}>{selectedReport.location}</Text>
              
              <View style={styles.modalStatusRow}>
                <Chip
                  mode="outlined"
                  textStyle={{ color: getStatusColor(selectedReport.status) }}
                  style={{ borderColor: getStatusColor(selectedReport.status) }}
                  icon={getStatusIcon(selectedReport.status)}
                >
                  {selectedReport.status}
                </Chip>
                <Chip
                  mode="outlined"
                  textStyle={{ color: getSeverityColor(selectedReport.severity) }}
                  style={{ borderColor: getSeverityColor(selectedReport.severity) }}
                >
                  {selectedReport.severity}
                </Chip>
              </View>

              <Text style={styles.modalDescription}>{selectedReport.description}</Text>
              
              <View style={styles.modalDetails}>
                <Text style={styles.modalDetailLabel}>Reporter:</Text>
                <Text style={styles.modalDetailValue}>{selectedReport.reporter}</Text>
                
                <Text style={styles.modalDetailLabel}>Time:</Text>
                <Text style={styles.modalDetailValue}>{selectedReport.timestamp}</Text>
                
                <Text style={styles.modalDetailLabel}>Coordinates:</Text>
                <Text style={styles.modalDetailValue}>
                  {selectedReport.coordinates.latitude.toFixed(6)}, {selectedReport.coordinates.longitude.toFixed(6)}
                </Text>
              </View>

              {selectedReport.photos && selectedReport.photos.length > 0 && (
                <View style={styles.modalPhotos}>
                  <Text style={styles.modalPhotosTitle}>Photos:</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {selectedReport.photos.map((photo, index) => (
                      <Image
                        key={index}
                        source={{ uri: photo }}
                        style={styles.modalPhoto}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}

              <Button
                mode="contained"
                onPress={() => setShowReportModal(false)}
                style={styles.closeModalButton}
              >
                Close
              </Button>
            </ScrollView>
          )}
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 60,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  headerTitle: {
    color: theme.colors.surface,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  headerSubtitle: {
    color: theme.colors.surface,
    fontSize: 16,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  filterCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  searchBar: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  filterSection: {
    marginBottom: theme.spacing.md,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  filterChips: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  filterChip: {
    marginRight: theme.spacing.sm,
  },
  selectedFilterChip: {
    backgroundColor: theme.colors.primary,
  },
  filterChipText: {
    color: theme.colors.text,
  },
  selectedFilterChipText: {
    color: theme.colors.surface,
  },
  reportsList: {
    flex: 1,
  },
  emptyCard: {
    marginTop: theme.spacing.xl,
  },
  emptyContent: {
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    color: theme.colors.textSecondary,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
  },
  reportCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  reportTitleSection: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  reportLocation: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  reportStatusSection: {
    marginLeft: theme.spacing.sm,
  },
  reportDescription: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  reportDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  reportDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reportDetailText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewButton: {
    borderColor: theme.colors.primary,
  },
  modalContainer: {
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  modalLocation: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  modalStatusRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  modalDescription: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    lineHeight: 24,
  },
  modalDetails: {
    marginBottom: theme.spacing.md,
  },
  modalDetailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
  },
  modalDetailValue: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  modalPhotos: {
    marginBottom: theme.spacing.lg,
  },
  modalPhotosTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  modalPhoto: {
    width: 120,
    height: 80,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
  },
  closeModalButton: {
    backgroundColor: theme.colors.primary,
    marginTop: theme.spacing.md,
  },
});

export default ViewReportsScreen;
