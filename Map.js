import React, { useState, useEffect, useRef } from 'react';

const MangroveMonitoringDashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [map, setMap] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // Top mangrove regions data
  const mangroveRegions = [
    {
      id: 1,
      name: "Sundarbans",
      location: "Bangladesh/India",
      coordinates: [22.5, 89.5],
      area: "10,000 km²",
      status: "Critical",
      threats: ["Sea level rise", "Cyclones", "Pollution", "Deforestation"],
      biodiversity: "Royal Bengal Tigers, Spotted Deer, Saltwater Crocodiles",
      description: "World's largest mangrove forest spanning Bangladesh and India, home to the endangered Bengal tiger."
    },
    {
      id: 2,
      name: "Everglades",
      location: "Florida, USA",
      coordinates: [25.5, -80.5],
      area: "6,104 km²",
      status: "At Risk",
      threats: ["Urban development", "Water pollution", "Hurricane damage"],
      biodiversity: "Manatees, American Crocodiles, Roseate Spoonbills",
      description: "Subtropical wetland ecosystem protecting Florida's southern coastline."
    },
    {
      id: 3,
      name: "Coral Bay Mangroves",
      location: "Australia",
      coordinates: [-16.5, 145.5],
      area: "1,200 km²",
      status: "Healthy",
      threats: ["Coral bleaching effects", "Coastal development"],
      biodiversity: "Sea turtles, Dugongs, Saltwater Crocodiles",
      description: "Pristine mangrove systems protecting Australia's Great Barrier Reef region."
    },
    {
      id: 4,
      name: "Pantanal Mangroves",
      location: "Brazil",
      coordinates: [-18.5, -56.5],
      area: "1,500 km²",
      status: "Healthy",
      threats: ["Cattle ranching", "Soy farming", "Climate change"],
      biodiversity: "Jaguars, Giant Otters, Hyacinth Macaws",
      description: "Extensive mangrove systems within the world's largest tropical wetland."
    },
    {
      id: 5,
      name: "Mahakam Delta",
      location: "Indonesia",
      coordinates: [-0.5, 117.5],
      area: "1,800 km²",
      status: "Critical",
      threats: ["Palm oil plantations", "Shrimp farming", "Coal mining"],
      biodiversity: "Proboscis Monkeys, Irrawaddy Dolphins, Orangutans",
      description: "Rapidly disappearing mangrove habitat in Indonesian Borneo."
    },
    {
      id: 6,
      name: "Niger Delta",
      location: "Nigeria",
      coordinates: [5.0, 6.5],
      area: "2,370 km²",
      status: "Critical",
      threats: ["Oil spills", "Gas flaring", "Industrial pollution"],
      biodiversity: "West African Manatees, Hippos, Waterbirds",
      description: "Africa's largest mangrove ecosystem facing severe oil industry impacts."
    },
    {
      id: 7,
      name: "Kinabatangan River",
      location: "Malaysia (Borneo)",
      coordinates: [5.5, 118.0],
      area: "560 km²",
      status: "At Risk",
      threats: ["Palm oil expansion", "Logging", "River pollution"],
      biodiversity: "Orangutans, Proboscis Monkeys, Pygmy Elephants",
      description: "Vital wildlife corridor with threatened mangrove forests."
    },
    {
      id: 8,
      name: "Ciénaga Grande",
      location: "Colombia",
      coordinates: [10.8, -74.5],
      area: "730 km²",
      status: "At Risk",
      threats: ["Water diversion", "Agricultural runoff", "Overfishing"],
      biodiversity: "Pink Flamingos, Caimans, West Indian Manatees",
      description: "Colombia's largest coastal lagoon with extensive mangrove systems."
    }
  ];

  // Set client flag after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize interactive map only on client
  useEffect(() => {
    if (!isClient || map || !mapRef.current) return;
    
    let mapInstance = null;
    
    const initMap = async () => {
      try {
        // Dynamic import Leaflet
        const L = await import('leaflet');
        const leaflet = L.default || L;
        
        // Create map instance
        mapInstance = leaflet.map(mapRef.current, {
          center: [20, 0],
          zoom: 2,
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          touchZoom: true,
          dragging: true
        });

        // Add tile layer
        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18
        }).addTo(mapInstance);

        // Create custom markers
        const createMarker = (status) => {
          const colors = {
            'Healthy': '#10B981',
            'At Risk': '#F59E0B', 
            'Critical': '#EF4444'
          };
          
          return leaflet.divIcon({
            className: 'custom-marker',
            html: `<div style="
              width: 16px; 
              height: 16px; 
              background: ${colors[status]}; 
              border: 3px solid white; 
              border-radius: 50%; 
              box-shadow: 0 3px 8px rgba(0,0,0,0.3);
              cursor: pointer;
              transition: transform 0.2s ease;
            "></div>`,
            iconSize: [22, 22],
            iconAnchor: [11, 11]
          });
        };

        // Add markers for each region
        mangroveRegions.forEach(region => {
          const marker = leaflet.marker(region.coordinates, { 
            icon: createMarker(region.status)
          }).addTo(mapInstance);

          // Create popup content
          const popupContent = `
            <div style="
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              min-width: 280px;
              max-width: 300px;
            ">
              <div style="
                background: linear-gradient(135deg, #059669, #10B981);
                color: white;
                padding: 12px;
                margin: -12px -16px 12px -16px;
                border-radius: 8px 8px 0 0;
              ">
                <h3 style="margin: 0; font-size: 18px; font-weight: bold;">
                  ${region.name}
                </h3>
                <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">
                  ${region.location}
                </p>
              </div>
              
              <div style="padding: 0;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="
                    width: 12px; 
                    height: 12px; 
                    border-radius: 50%; 
                    background: ${region.status === 'Healthy' ? '#10B981' : region.status === 'At Risk' ? '#F59E0B' : '#EF4444'};
                  "></span>
                  <span style="font-weight: bold; color: #374151;">
                    Status: ${region.status}
                  </span>
                </div>
                
                <p style="margin: 8px 0; font-size: 14px; color: #4B5563;">
                  <strong>Area:</strong> ${region.area}
                </p>
                
                <p style="margin: 8px 0; font-size: 13px; color: #6B7280; line-height: 1.4;">
                  ${region.description}
                </p>
                
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #E5E7EB;">
                  <p style="margin: 0; font-size: 12px; color: #6B7280;">
                    <strong>Key Species:</strong> ${region.biodiversity}
                  </p>
                </div>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent, {
            maxWidth: 320,
            className: 'custom-popup'
          });

          marker.on('click', () => {
            setSelectedRegion(region);
          });

          // Hover effects
          marker.on('mouseover', function() {
            if (this.getElement()) {
              this.getElement().style.transform = 'scale(1.2)';
            }
          });
          
          marker.on('mouseout', function() {
            if (this.getElement()) {
              this.getElement().style.transform = 'scale(1)';
            }
          });

          markersRef.current.push(marker);
        });

        setMap(mapInstance);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
        setMap(null);
        markersRef.current = [];
      }
    };
  }, [isClient]);

  const centerMapOnRegion = (region) => {
    if (map && region) {
      map.setView(region.coordinates, 7);
      setSelectedRegion(region);
      
      // Find and open popup for selected region
      markersRef.current.forEach(marker => {
        const markerLatLng = marker.getLatLng();
        if (Math.abs(markerLatLng.lat - region.coordinates[0]) < 0.1 && 
            Math.abs(markerLatLng.lng - region.coordinates[1]) < 0.1) {
          marker.openPopup();
        }
      });
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Healthy': return '#10B981';
      case 'At Risk': return '#F59E0B';
      case 'Critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    return '●';
  };

  // Static date to prevent hydration mismatch
  const lastUpdated = 'August 31, 2025';

  return (
    <>
      {/* Leaflet CSS - only load on client */}
      {isClient && (
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css"
          crossOrigin=""
        />
      )}

      <div className="h-screen bg-gray-50 overflow-hidden">
        <div className="flex h-full">
          
          {/* Left Side - Interactive Map (75%) */}
          <div className="w-3/4 h-full relative">
            <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg px-4 py-3">
              <h1 className="text-xl font-bold text-gray-800 mb-1">🌿 Mangrove Monitor</h1>
              <p className="text-sm text-gray-600">Interactive Global Dashboard</p>
            </div>
            
            {isClient ? (
              <div 
                ref={mapRef} 
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading interactive map...</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Sidebar (25%) */}
          <div className="w-1/4 h-full bg-white border-l border-gray-200 flex flex-col">
            
            {/* Sidebar Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6">
              <h2 className="text-xl font-bold mb-2">Top Mangrove Regions</h2>
              <p className="text-emerald-100 text-sm">Click to explore on map</p>
              
              {/* Status Summary */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="text-center bg-white bg-opacity-20 rounded-lg py-2">
                  <div className="text-green-200 font-semibold">Healthy</div>
                  <div className="text-lg font-bold">
                    {mangroveRegions.filter(r => r.status === 'Healthy').length}
                  </div>
                </div>
                <div className="text-center bg-white bg-opacity-20 rounded-lg py-2">
                  <div className="text-yellow-200 font-semibold">At Risk</div>
                  <div className="text-lg font-bold">
                    {mangroveRegions.filter(r => r.status === 'At Risk').length}
                  </div>
                </div>
                <div className="text-center bg-white bg-opacity-20 rounded-lg py-2">
                  <div className="text-red-200 font-semibold">Critical</div>
                  <div className="text-lg font-bold">
                    {mangroveRegions.filter(r => r.status === 'Critical').length}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scrollable Region List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {mangroveRegions.map((region, index) => (
                  <div
                    key={region.id}
                    onClick={() => centerMapOnRegion(region)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                      selectedRegion?.id === region.id
                        ? 'border-emerald-500 bg-emerald-50 shadow-md'
                        : 'border-gray-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm leading-tight">
                            {region.name}
                          </h3>
                          <p className="text-xs text-gray-500">{region.location}</p>
                        </div>
                      </div>
                      
                      {/* Status Indicator */}
                      <div className="flex flex-col items-end">
                        <span 
                          className="text-lg"
                          style={{ color: getStatusColor(region.status) }}
                        >
                          {getStatusIcon(region.status)}
                        </span>
                        <span 
                          className="text-xs font-semibold"
                          style={{ color: getStatusColor(region.status) }}
                        >
                          {region.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* Area Coverage */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Area Coverage</span>
                      <span className="text-xs font-semibold text-emerald-600">{region.area}</span>
                    </div>
                    
                    {/* Health Bar */}
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-700 rounded-full"
                          style={{ 
                            backgroundColor: getStatusColor(region.status),
                            width: region.status === 'Healthy' ? '85%' : 
                                   region.status === 'At Risk' ? '55%' : '25%'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Footer Stats */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Total Monitored Area</p>
                  <p className="text-lg font-bold text-emerald-600">24,264 km²</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Data updated: {lastUpdated}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles - only apply on client */}
      {isClient && (
        <style jsx global>{`
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
          }
          
          .leaflet-container {
            height: 100vh;
            width: 100%;
            z-index: 1;
          }
          
          .custom-marker {
            background: transparent !important;
            border: none !important;
          }
          
          .leaflet-popup-content-wrapper {
            border-radius: 12px !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
            border: none !important;
            overflow: hidden !important;
          }
          
          .leaflet-popup-content {
            margin: 0 !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            width: 300px !important;
          }
          
          .leaflet-popup-tip {
            background: white !important;
            border: none !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
          }
          
          .leaflet-popup-close-button {
            background: rgba(0,0,0,0.1) !important;
            border-radius: 50% !important;
            width: 24px !important;
            height: 24px !important;
            font-size: 16px !important;
            line-height: 24px !important;
            text-align: center !important;
            top: 8px !important;
            right: 8px !important;
            color: white !important;
          }
          
          .leaflet-control-zoom {
            border-radius: 8px !important;
            overflow: hidden !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
          }
          
          .leaflet-control-zoom a {
            background: white !important;
            color: #374151 !important;
            border: none !important;
            width: 36px !important;
            height: 36px !important;
            line-height: 36px !important;
            font-size: 18px !important;
            font-weight: bold !important;
            transition: all 0.2s ease !important;
          }
          
          .leaflet-control-zoom a:hover {
            background: #F3F4F6 !important;
            color: #059669 !important;
          }
          
          .leaflet-control-attribution {
            background: rgba(255,255,255,0.8) !important;
            border-radius: 4px !important;
            font-size: 10px !important;
          }

          /* Custom scrollbar for sidebar */
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }
          
          .overflow-y-auto::-webkit-scrollbar-track {
            background: #F3F4F6;
            border-radius: 3px;
          }
          
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #D1D5DB;
            border-radius: 3px;
          }
          
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #9CA3AF;
          }
        `}</style>
      )}
    </>
  );
};

export default MangroveMonitoringDashboard;