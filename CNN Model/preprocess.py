
# preprocess.py
import tensorflow as tf
import numpy as np
from PIL import Image

# !!! CRITICAL: These values MUST match your training parameters EXACTLY !!!
IMG_HEIGHT = 256  # From your code
IMG_WIDTH = 256   # From your code

# !!! CRITICAL: Use the SAME normalization values !!!
MEAN = [0.485, 0.456, 0.406]   # From your code
STD = [0.229, 0.224, 0.225]    # From your code

# !!! CRITICAL: Class names in the correct order (same as model output) !!!
# Your model has 4 output neurons. Map index 0->3 to the correct class.
CLASS_NAMES = ["Class_0", "Class_1", "Class_2", "Class_3"]  # REPLACE WITH YOUR CLASS NAMES
# e.g., ["Mangrove", "Deforestation", "Forest_Fire", "Waste_Dump"]

def load_and_preprocess_image(image_path):
    """
    Load and preprocess an image for prediction.
    This function replicates the 'val_preprocess' function from training,
    but excludes steps related to labels and one-hot encoding.
    """
    # 1. Read and decode the image (like the 'load_image' function)
    image = tf.io.read_file(image_path)
    image = tf.image.decode_image(image, channels=3, expand_animations=False)
    image.set_shape([None, None, 3]) # Ensure shape is known

    # 2. Resize (from val_preprocess)
    image = tf.image.resize(image, [IMG_HEIGHT, IMG_WIDTH])

    # 3. Normalize to [0, 1] (from val_preprocess)
    image = tf.cast(image, tf.float32) / 255.0

    # 4. Standardize with ImageNet stats (from val_preprocess)
    image = (image - MEAN) / STD

    # 5. Add batch dimension: change from (H, W, C) to (1, H, W, C)
    # This is required for model.predict()
    image = tf.expand_dims(image, axis=0)

    return image

def predict_class(model, img_array):
    """
    Make a prediction and return the class name and confidence.
    Your model has 4 output neurons (softmax), so we get the highest one.
    """
    predictions = model.predict(img_array)
    
    # Get the index of the highest probability
    predicted_index = np.argmax(predictions[0])
    # Get the confidence score for that class
    confidence = predictions[0][predicted_index]
    # Get the human-readable class name
    class_name = CLASS_NAMES[predicted_index]
    
    return class_name, confidence
