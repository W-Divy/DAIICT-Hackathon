import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Platform,
} from 'react-native';
import {
  Card,
  Title,
  TextInput,
  Button,
  Text,
  Chip,
  SegmentedButtons,
  Portal,
  Modal,
} from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme/theme';

const ReportIncidentScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    incidentType: '',
    description: '',
    location: '',
    severity: 'Medium',
    coordinates: null,
  });
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const incidentTypes = [
    'Illegal Cutting',
    'Land Reclamation',
    'Pollution',
    'Habitat Destruction',
    'Illegal Fishing',
    'Other',
  ];

  const severityLevels = ['Low', 'Medium', 'High', 'Critical'];

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to report incidents accurately.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }));
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const takePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
      saveToPhotos: false,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Error', 'Failed to take photo');
        return;
      }
      if (response.assets && response.assets[0]) {
        const newPhoto = {
          id: Date.now(),
          uri: response.assets[0].uri,
          type: 'camera',
        };
        setPhotos(prev => [...prev, newPhoto]);
      }
    });
  };

  const selectPhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
      selectionLimit: 5,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Error', 'Failed to select photo');
        return;
      }
      if (response.assets) {
        const newPhotos = response.assets.map((asset, index) => ({
          id: Date.now() + index,
          uri: asset.uri,
          type: 'gallery',
        }));
        setPhotos(prev => [...prev, ...newPhotos]);
      }
    });
  };

  const removePhoto = (photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const handleSubmit = async () => {
    if (!formData.incidentType || !formData.description || photos.length === 0) {
      Alert.alert('Error', 'Please fill in all required fields and add at least one photo');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success!',
        'Your report has been submitted and is under review. You earned 50 points!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    }, 2000);
  };

  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo);
    setShowPhotoModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Report Incident</Title>
        <Text style={styles.headerSubtitle}>
          Help protect our mangrove ecosystems by reporting threats
        </Text>
      </View>

      <View style={styles.content}>
        {/* Incident Type Selection */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Incident Type *</Title>
            <View style={styles.chipContainer}>
              {incidentTypes.map((type) => (
                <Chip
                  key={type}
                  selected={formData.incidentType === type}
                  onPress={() => setFormData(prev => ({ ...prev, incidentType: type }))}
                  style={[
                    styles.chip,
                    formData.incidentType === type && styles.selectedChip,
                  ]}
                  textStyle={[
                    styles.chipText,
                    formData.incidentType === type && styles.selectedChipText,
                  ]}
                >
                  {type}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Description */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Description *</Title>
            <TextInput
              mode="outlined"
              placeholder="Describe what you observed..."
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={4}
              style={styles.textInput}
            />
          </Card.Content>
        </Card>

        {/* Location */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Location</Title>
            <TextInput
              mode="outlined"
              placeholder="Enter location name or address"
              value={formData.location}
              onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
              style={styles.textInput}
            />
            {formData.coordinates && (
              <View style={styles.coordinatesContainer}>
                <Icon name="map-marker" size={20} color={theme.colors.primary} />
                <Text style={styles.coordinatesText}>
                  {formData.coordinates.latitude.toFixed(6)}, {formData.coordinates.longitude.toFixed(6)}
                </Text>
              </View>
            )}
            <Button
              mode="outlined"
              onPress={getCurrentLocation}
              style={styles.locationButton}
              icon="crosshairs-gps"
            >
              Use Current Location
            </Button>
          </Card.Content>
        </Card>

        {/* Severity Level */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Severity Level</Title>
            <SegmentedButtons
              value={formData.severity}
              onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}
              buttons={severityLevels.map(level => ({
                value: level,
                label: level,
                style: styles.segmentedButton,
              }))}
              style={styles.segmentedButtons}
            />
          </Card.Content>
        </Card>

        {/* Photo Evidence */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Photo Evidence *</Title>
            <Text style={styles.photoSubtitle}>
              Add clear photos to help validate your report
            </Text>
            
            <View style={styles.photoButtons}>
              <Button
                mode="contained"
                onPress={takePhoto}
                style={[styles.photoButton, { backgroundColor: theme.colors.primary }]}
                icon="camera"
              >
                Take Photo
              </Button>
              <Button
                mode="outlined"
                onPress={selectPhoto}
                style={styles.photoButton}
                icon="image"
              >
                Choose Photo
              </Button>
            </View>

            {photos.length > 0 && (
              <View style={styles.photosContainer}>
                <Text style={styles.photosTitle}>Added Photos ({photos.length})</Text>
                <View style={styles.photosGrid}>
                  {photos.map((photo) => (
                    <View key={photo.id} style={styles.photoItem}>
                      <Image source={{ uri: photo.uri }} style={styles.photoThumbnail} />
                      <Button
                        mode="text"
                        onPress={() => openPhotoModal(photo)}
                        style={styles.viewPhotoButton}
                      >
                        View
                      </Button>
                      <Button
                        mode="text"
                        onPress={() => removePhoto(photo.id)}
                        style={styles.removePhotoButton}
                        textColor={theme.colors.error}
                      >
                        Remove
                      </Button>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Submit Button */}
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading || !formData.incidentType || !formData.description || photos.length === 0}
          style={styles.submitButton}
          labelStyle={styles.submitButtonLabel}
        >
          Submit Report
        </Button>
      </View>

      {/* Photo Modal */}
      <Portal>
        <Modal
          visible={showPhotoModal}
          onDismiss={() => setShowPhotoModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedPhoto && (
            <Image source={{ uri: selectedPhoto.uri }} style={styles.modalImage} />
          )}
          <Button
            mode="contained"
            onPress={() => setShowPhotoModal(false)}
            style={styles.closeModalButton}
          >
            Close
          </Button>
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
    padding: theme.spacing.lg,
  },
  card: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
    color: theme.colors.primary,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    marginBottom: theme.spacing.sm,
  },
  selectedChip: {
    backgroundColor: theme.colors.primary,
  },
  chipText: {
    color: theme.colors.text,
  },
  selectedChipText: {
    color: theme.colors.surface,
  },
  textInput: {
    marginBottom: theme.spacing.sm,
  },
  coordinatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  coordinatesText: {
    marginLeft: theme.spacing.sm,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  locationButton: {
    marginTop: theme.spacing.sm,
  },
  segmentedButtons: {
    marginTop: theme.spacing.sm,
  },
  segmentedButton: {
    flex: 1,
  },
  photoSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  photoButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  photosContainer: {
    marginTop: theme.spacing.md,
  },
  photosTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  photoItem: {
    alignItems: 'center',
    width: '30%',
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.xs,
  },
  viewPhotoButton: {
    marginBottom: theme.spacing.xs,
  },
  removePhotoButton: {
    marginBottom: theme.spacing.xs,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xxl,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  closeModalButton: {
    backgroundColor: theme.colors.primary,
  },
});

export default ReportIncidentScreen;
