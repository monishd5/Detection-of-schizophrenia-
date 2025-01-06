import os
import numpy as np
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications import VGG16
from tensorflow.keras.applications.vgg16 import preprocess_input
from joblib import load  # Import joblib for loading the model

# Path to the folder containing the 61 scans
folder_path = 'C:\\Users\\Dell\\Documents\\capstone\\finaldatasetcapstone\\finaldatasetcapstone\\sub-A00000456_ses-20090101_task-rest_bold_normalized.nii'

# Path to the saved RandomForest model
model_path = 'C:\\Users\\Dell\\Documents\\capstone\\random_forest_model.joblib'

# Load the pre-trained VGG16 model
vgg_model = VGG16(include_top=False, weights='imagenet', input_shape=(224, 224, 3))

# Function to process a single image and extract features using VGG16
def extract_features(image_path):
    img = load_img(image_path, target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    features = vgg_model.predict(img_array)
    return features.flatten()

# Function to process all scans in the folder and extract averaged features
def process_scans(folder_path):
    features_list = []
    for image_file in os.listdir(folder_path):
        image_path = os.path.join(folder_path, image_file)
        features = extract_features(image_path)
        features_list.append(features)
    
    # Average the features across all scans
    avg_features = np.mean(features_list, axis=0)
    return avg_features

# Process the folder to get averaged features
scan_features = process_scans(folder_path)

# Load the trained RandomForest model
rf_model = load(model_path)  # Load using joblib

# Predict the output based on the extracted features
scan_features = scan_features.reshape(1, -1)  # Reshape for prediction
prediction = rf_model.predict(scan_features)

# Output the prediction
if prediction[0] == 1:
    print("Prediction: Positive (Schizophrenia detected)")
else:
    print("Prediction: Negative (No schizophrenia detected)")
