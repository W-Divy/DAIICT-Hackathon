
# example_usage.py
import tensorflow as tf
from preprocess import load_and_preprocess_image, predict_class, CLASS_NAMES

# 1. Load the model you received
print("Loading model...")
model = tf.keras.models.load_model('mangrove_deforestation_model.keras')
print("Model loaded successfully!")

# 2. Preprocess a new image (they would replace this path)
img_array = load_and_preprocess_image('path_to_your_test_image.jpg')

# 3. Make a prediction
class_name, confidence = predict_class(model, img_array)

# 4. Print the result
print(f"Prediction: {class_name}")
print(f"Confidence: {confidence:.2%}")

# Optional: Print all class names for reference
print(f"\nAvailable classes: {CLASS_NAMES}")
