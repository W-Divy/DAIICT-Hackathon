from google.generativeai import configure, GenerativeModel
import google.generativeai as genai
from PIL import Image

# Configure Gemini API (replace with your API key)
genai.configure(api_key="AIzaSyBhIpye5-ch3MSxZLaHyEPvq4MNpSiYPRo")

# Load the Gemini model (use vision-capable model)
model = genai.GenerativeModel("gemini-1.5-flash")

# Load the image you want to test
image_path = "deforestation_img.jpg"   # Replace with your image file path
img = Image.open(image_path)

# Give a simple instruction for classification
prompt = """
You are an environmental AI system. 
Classify the given forest image into one of the following categories:
1. Healthy Forest
2. Mangrove Deforestation
Just classify between the categories and give output from ['Healthy Forest','Mangrove Deforestation'] no need to explain any detail .
"""

# Generate response
response = model.generate_content([prompt, img])

print("Result:")
print(response.text)
