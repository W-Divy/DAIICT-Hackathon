
# nlp_model_usage.py
from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline
import torch

# 1. Load the model and tokenizer from the saved directory
model_path = "./nlp_model_deforestation"  # Path to your saved model

# Method 1: Load using Auto classes (recommended)
model = AutoModelForSequenceClassification.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(model_path)

# Method 2: Create a prediction pipeline for easy use
classifier = pipeline(
    "text-classification",
    model=model,
    tokenizer=tokenizer,
    device=0 if torch.cuda.is_available() else -1  # Use GPU if available
)

# 2. Define your class names (UPDATE THESE TO MATCH YOUR MODEL)
# These must be in the same order as your model's output logits
class_names = [
    "Deforestation Report", 
    "Non-Deforestation Issue",
    "Irrelevant" 
    # REPLACE WITH YOUR ACTUAL CLASS NAMES
]

# 3. Function to make predictions
def predict_text(text):
    """
    Predict the class of a new text input.
    Returns: (class_name, confidence_score)
    """
    # Use the pipeline for simple prediction
    result = classifier(text)[0]
    
    # The pipeline returns a label like 'LABEL_0', 'LABEL_1', etc.
    # Extract the index from the label
    label_index = int(result['label'].split('_')[-1])
    
    # Get the corresponding class name
    class_name = class_names[label_index]
    confidence = result['score']
    
    return class_name, confidence

# 4. Example usage
if __name__ == "__main__":
    # Test the model
    test_texts = [
        "Illegal logging observed in mangrove area",
        "Beautiful birds in the forest",
        "The weather is nice today"
    ]
    
    for text in test_texts:
        class_name, confidence = predict_text(text)
        print(f"Text: '{text}'")
        print(f"Prediction: {class_name} ({confidence:.2%})")
        print("-" * 50)
