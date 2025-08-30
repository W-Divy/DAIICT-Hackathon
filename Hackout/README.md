# 🌿 Mangrove Monitor

A React Native mobile application designed to empower coastal communities, fishermen, and citizen scientists to participate in mangrove ecosystem protection through participatory monitoring and gamified engagement.

## 🎯 Problem Statement

Mangrove forests act as natural barriers against storms and are vital for biodiversity and carbon storage, yet they are increasingly threatened by illegal cutting, land reclamation, and pollution. This app addresses the need for a participatory monitoring system where users can report incidents via mobile apps with geotagged photos, satellite data integration, and AI-assisted validation.

## ✨ Features

### 🔍 Incident Reporting
- **Photo Evidence**: Capture and upload photos with camera or gallery
- **Geolocation**: Automatic GPS coordinates for accurate incident location
- **Incident Types**: Report illegal cutting, land reclamation, pollution, habitat destruction, and more
- **Severity Levels**: Classify incidents from Low to Critical
- **Rich Descriptions**: Detailed incident descriptions and observations

### 📊 Dashboard & Analytics
- **Real-time Statistics**: View monthly reports, growth metrics, and accuracy rates
- **Recent Reports**: Monitor latest submissions and their status
- **Mission Progress**: Track community goals and achievements
- **Quick Actions**: Easy access to report incidents and view reports

### 🏆 Gamification System
- **Points System**: Earn points for reports, verifications, and achievements
- **Leaderboards**: Compete with other mangrove protectors
- **Achievement Badges**: Unlock badges like "Mangrove Protector", "Coastal Guardian"
- **User Levels**: Progress from Beginner to Expert based on activity
- **Community Challenges**: Participate in monthly missions

### 📱 User Experience
- **Modern UI/UX**: Beautiful mangrove-themed design with ocean colors
- **Intuitive Navigation**: Tab-based navigation with clear icons
- **Search & Filters**: Find reports by type, status, and keywords
- **Profile Management**: Edit profile, view statistics, and manage settings
- **Offline Support**: Basic functionality works without internet

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mangrove-monitor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   ```

5. **Run on device/emulator**
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   ```

## 📱 App Structure

```
src/
├── screens/
│   ├── LoginScreen.js          # User authentication
│   ├── HomeScreen.js           # Dashboard and overview
│   ├── ReportIncidentScreen.js # Incident reporting form
│   ├── ViewReportsScreen.js    # Browse and filter reports
│   ├── LeaderboardScreen.js    # Rankings and achievements
│   └── ProfileScreen.js        # User profile and settings
├── theme/
│   └── theme.js               # App-wide styling and colors
└── components/                 # Reusable UI components
```

## 🎨 Design System

### Color Palette
- **Primary**: Dark Green (#2E7D32) - Represents mangrove forests
- **Secondary**: Light Green (#8BC34A) - Growth and sustainability
- **Ocean**: Blue (#1976D2) - Coastal waters
- **Mangrove**: Brown-Green (#4A6741) - Natural ecosystem colors
- **Accent**: Orange (#FF9800) - Alerts and warnings

### Typography
- **Headers**: Bold, large text for main titles
- **Body**: Readable text for descriptions and content
- **Captions**: Smaller text for metadata and secondary information

## 🔧 Technical Implementation

### Core Technologies
- **React Native 0.72.6**: Cross-platform mobile development
- **React Navigation**: Screen navigation and routing
- **React Native Paper**: Material Design components
- **React Native Vector Icons**: Icon library
- **React Native Linear Gradient**: Beautiful gradient backgrounds

### Key Features
- **State Management**: React hooks for local state
- **Navigation**: Stack and tab navigation
- **Permissions**: Camera, location, and storage access
- **Image Handling**: Photo capture, selection, and display
- **Geolocation**: GPS coordinates and location services

### Dependencies
```json
{
  "react-native-maps": "Maps integration",
  "react-native-geolocation-service": "GPS functionality",
  "react-native-image-picker": "Camera and gallery access",
  "react-native-vector-icons": "Icon library",
  "react-native-paper": "UI components",
  "react-native-linear-gradient": "Gradient backgrounds"
}
```

## 📋 User Workflow

1. **Authentication**: Login or create account
2. **Dashboard**: View statistics and recent activity
3. **Report Incident**: 
   - Select incident type
   - Add description and location
   - Capture/select photos
   - Submit report
4. **Track Progress**: Monitor report status and earn points
5. **Compete**: View leaderboards and unlock achievements
6. **Manage Profile**: Update information and preferences

## 🌟 Key Benefits

### For Users
- **Easy Reporting**: Simple interface for incident documentation
- **Community Engagement**: Connect with other environmentalists
- **Gamification**: Fun and rewarding experience
- **Impact Tracking**: See your contribution to conservation

### For Conservation
- **Real-time Monitoring**: Immediate incident detection
- **Data Collection**: Rich dataset for research and policy
- **Community Involvement**: Empower local stakeholders
- **Prevention**: Deter illegal activities through monitoring

## 🔮 Future Enhancements

- **AI Validation**: Machine learning for automatic incident verification
- **Satellite Integration**: Combine ground reports with satellite imagery
- **Real-time Alerts**: Push notifications for nearby incidents
- **Offline Maps**: Download maps for areas without internet
- **Multi-language Support**: Local language interfaces
- **Data Export**: Generate reports for authorities and researchers

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines and submit pull requests for any improvements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Coastal communities and fishermen for their invaluable knowledge
- Environmental organizations working on mangrove conservation
- React Native community for the excellent development framework
- Design inspiration from nature and coastal ecosystems

---

**Together, let's protect our mangrove ecosystems for future generations! 🌿🌊**
