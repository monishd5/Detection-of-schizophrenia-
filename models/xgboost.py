import xgboost as xgb
from sklearn.metrics import accuracy_score, classification_report


# Load the combined dataset from the pickle file
file_path = 'E:\capstone\Phase 2\capstone.pkl'
with open(file_path, 'rb') as file:
    combined_data = pickle.load(file)

# Check the structure of the DataFrame
print(combined_data.shape)  # Should print (num_samples, 25089)

# Separate features (all columns except 'Label') and labels ('Label' column)
X = combined_data.drop('Label', axis=1)
y = combined_data['Label']

# Split the data into training and testing sets (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2 )


# Initialize the XGBoost classifier
xgb_classifier = xgb.XGBClassifier(random_state=42)

# Train the XGBoost model
xgb_classifier.fit(X_train, y_train)

# Predict on the test set
y_pred_xgb = xgb_classifier.predict(X_test)

# Evaluate the model
xgb_accuracy = accuracy_score(y_test, y_pred_xgb)
print(f"XGBoost Accuracy: {xgb_accuracy}")

# Optional: Detailed classification metrics
print(classification_report(y_test, y_pred_xgb))
