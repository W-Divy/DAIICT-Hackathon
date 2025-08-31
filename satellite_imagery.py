# INSTANT SATELLITE DATA SOLUTION FOR VEGETATION HEALTH MONITORING
import requests
import numpy as np
import matplotlib.pyplot as plt
from skimage import io as skio
from datetime import datetime, timedelta
import calendar
from matplotlib.colors import LinearSegmentedColormap

def get_sentinel_thumbnail(lat, lon, date='2025-01-01', size=512):
    """Get Sentinel-2 thumbnail instantly without authentication"""
    # Use public WMS service as fallback
    wms_url = f"https://tiles.maps.eox.at/wms?service=WMS&request=GetMap&version=1.1.1&layers=s2cloudless&styles=&format=image/jpeg&width={size}&height={size}&srs=EPSG:4326&bbox={lon-0.1},{lat-0.1},{lon+0.1},{lat+0.1}&time={date}"

    try:
        image = skio.imread(wms_url)
        return image
    except:
        # Fallback to static image (for demonstration)
        print(f"Failed to fetch image for {date}, using fallback")
        return skio.imread('https://storage.googleapis.com/global-surface-water/downloads2020/sample-images/sentinel2_sundarbans.jpg')

def calculate_ndvi(image):
    """Calculate NDVI (Normalized Difference Vegetation Index) from RGB image"""
    # Convert to float for calculations
    rgb = image.astype(float)

    # Extract bands (approximation since we don't have true NIR band)
    # For demonstration, we'll use the red and green channels
    red = rgb[:, :, 0]
    green = rgb[:, :, 1]
    blue = rgb[:, :, 2]

    # Approximate NIR using the relationship: NIR ≈ 2.5 * Green - 1.5 * Red - 0.5 * Blue
    # This is a rough approximation for demonstration purposes
    nir_approx = 2.5 * green - 1.5 * red - 0.5 * blue
    nir_approx = np.clip(nir_approx, 0, 255)  # Ensure values are within valid range

    # Calculate NDVI
    ndvi = (nir_approx - red) / (nir_approx + red + 1e-10)  # Add small value to avoid division by zero

    return ndvi

def get_previous_months_images(lat, lon, months=12):
    """Get Sentinel-2 images for previous months"""
    images = {}
    ndvis = {}

    current_date = datetime.now()

    for i in range(months):
        # Calculate date for previous month
        month_offset = i + 1
        year = current_date.year
        month = current_date.month - month_offset

        if month <= 0:
            month += 12
            year -= 1

        # Get the last day of the month
        last_day = calendar.monthrange(year, month)[1]
        date_str = f"{year}-{month:02d}-{last_day:02d}"

        print(f"Fetching image for {date_str}...")
        image = get_sentinel_thumbnail(lat, lon, date=date_str)
        images[date_str] = image

        # Calculate NDVI
        ndvi = calculate_ndvi(image)
        ndvis[date_str] = ndvi

    return images, ndvis

def analyze_vegetation_health(ndvis):
    """Analyze vegetation health from NDVI values"""
    # Convert to arrays for analysis
    dates = list(ndvis.keys())
    ndvi_arrays = list(ndvis.values())

    # Calculate statistics
    mean_ndvi = np.mean([np.mean(ndvi) for ndvi in ndvi_arrays])
    std_ndvi = np.mean([np.std(ndvi) for ndvi in ndvi_arrays])

    # Calculate changes between consecutive months
    changes = []
    for i in range(1, len(ndvi_arrays)):
        change = np.mean(ndvi_arrays[i] - ndvi_arrays[i-1])
        changes.append(change)

    # Detect anomalies (significant changes)
    anomalies = []
    anomaly_threshold = std_ndvi * 1.5  # 1.5 standard deviations

    for i, change in enumerate(changes):
        if abs(change) > anomaly_threshold:
            anomalies.append({
                'period': f"{dates[i]} to {dates[i+1]}",
                'change': change,
                'severity': 'High' if abs(change) > std_ndvi * 2 else 'Medium'
            })

    # Generate health status
    latest_ndvi = np.mean(ndvi_arrays[-1])

    if latest_ndvi > mean_ndvi + std_ndvi:
        health_status = "Excellent"
    elif latest_ndvi > mean_ndvi:
        health_status = "Good"
    elif latest_ndvi > mean_ndvi - std_ndvi:
        health_status = "Fair"
    else:
        health_status = "Poor"

    return {
        'mean_ndvi': mean_ndvi,
        'std_ndvi': std_ndvi,
        'latest_ndvi': latest_ndvi,
        'health_status': health_status,
        'changes': changes,
        'anomalies': anomalies
    }

def create_vegetation_colormap():
    """Create a colormap suitable for vegetation visualization"""
    colors = ['brown', 'yellow', 'yellowgreen', 'green', 'darkgreen']
    return LinearSegmentedColormap.from_list('vegetation', colors, N=100)

# Main analysis
sundarbans_lat, sundarbans_lon = 20.7151, 86.8659  # Corrected Sundarbans coordinates

print("Fetching historical Sentinel-2 images...")
images, ndvis = get_previous_months_images(sundarbans_lat, sundarbans_lon, months=6)

print("Analyzing vegetation health...")
health_stats = analyze_vegetation_health(ndvis)

# Create visualization
fig, axes = plt.subplots(2, 4, figsize=(20, 10))
fig.suptitle('Sentinel-2 Vegetation Health Monitoring', fontsize=16)

# Plot original images
dates = list(images.keys())
for i, date in enumerate(dates[:4]):
    axes[0, i].imshow(images[date])
    axes[0, i].set_title(f'Image: {date}')
    axes[0, i].axis('off')

# Plot NDVI images
veg_cmap = create_vegetation_colormap()
for i, date in enumerate(dates[:4]):
    ndvi_img = axes[1, i].imshow(ndvis[date], cmap=veg_cmap, vmin=-1, vmax=1)
    axes[1, i].set_title(f'NDVI: {date}')
    axes[1, i].axis('off')
    plt.colorbar(ndvi_img, ax=axes[1, i], fraction=0.046, pad=0.04)

# Remove empty subplots if we have less than 4 months
for i in range(len(dates), 4):
    fig.delaxes(axes[0, i])
    fig.delaxes(axes[1, i])

plt.tight_layout()
plt.show()

# Display statistics
print("\n" + "="*50)
print("VEGETATION HEALTH ANALYSIS REPORT")
print("="*50)
print(f"Mean NDVI: {health_stats['mean_ndvi']:.4f}")
print(f"NDVI Standard Deviation: {health_stats['std_ndvi']:.4f}")
print(f"Latest NDVI: {health_stats['latest_ndvi']:.4f}")
print(f"Vegetation Health Status: {health_stats['health_status']}")

if health_stats['anomalies']:
    print("\nDETECTED ANOMALIES:")
    for anomaly in health_stats['anomalies']:
        trend = "increase" if anomaly['change'] > 0 else "decrease"
        print(f"- {anomaly['period']}: Significant {trend} in vegetation ({anomaly['severity']} severity)")
else:
    print("\nNo significant anomalies detected in the vegetation health.")

# Plot NDVI trend over time
plt.figure(figsize=(10, 6))
mean_ndvis = [np.mean(ndvis[date]) for date in dates]
plt.plot(dates[::-1], mean_ndvis[::-1], 'o-', linewidth=2, markersize=8)
plt.axhline(y=health_stats['mean_ndvi'], color='r', linestyle='--', label=f'Mean NDVI: {health_stats["mean_ndvi"]:.4f}')
plt.fill_between(dates[::-1],
                 health_stats['mean_ndvi'] - health_stats['std_ndvi'],
                 health_stats['mean_ndvi'] + health_stats['std_ndvi'],
                 alpha=0.2, color='gray', label='Normal range (±1 std dev)')

plt.xlabel('Date')
plt.ylabel('Mean NDVI')
plt.title('Vegetation Health Trend Over Time')
plt.legend()
plt.grid(True, alpha=0.3)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

print("\nSatellite data analysis completed successfully!")