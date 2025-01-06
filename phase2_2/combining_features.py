import pickle
import pandas as pd
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split

# Load the extracted features from the pickle files
with open('C:\\Users\\Dell\\Documents\\capstone\\positive_features.pkl', 'rb') as file:
    positive_features = pickle.load(file)

with open('C:\\Users\\Dell\\Documents\\capstone\\negative_features.pkl', 'rb') as file:
    negative_features = pickle.load(file)

# Convert dictionaries to DataFrames
pos_df = pd.DataFrame.from_dict(positive_features, orient='index')
pos_df['Label'] = 1  # Label for positive class

neg_df = pd.DataFrame.from_dict(negative_features, orient='index')
neg_df['Label'] = 0  # Label for negative class

# Combine into a single DataFrame
combined_df = pd.concat([pos_df, neg_df], axis=0)
combined_df = shuffle(combined_df)  # Shuffle the dataset

# Save the combined dataset to a CSV file
combined_csv_path = 'C:\\Users\\Dell\\Documents\\capstone\\combined_features.csv'
combined_df.to_csv(combined_csv_path, index=False)

print(f"Combined features saved successfully at {combined_csv_path}")
