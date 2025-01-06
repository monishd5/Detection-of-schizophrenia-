# Import necessary libraries
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import SMOTE
import pandas as pd
import numpy as np
import shap

# Load training and testing data
train_data_path = 'C:\\Users\\Dell\\Documents\\capstone\\train_data.csv'
test_data_path = 'C:\\Users\\Dell\\Documents\\capstone\\test_data.csv'

train_data = pd.read_csv(train_data_path)
test_data = pd.read_csv(test_data_path)

# Separate features (X) and labels (y)
X_train = train_data.drop('Label', axis=1)
y_train = train_data['Label']
X_test = test_data.drop('Label', axis=1)
y_test = test_data['Label']

# Handle class imbalance using SMOTE
smote = SMOTE(random_state=42)
X_train, y_train = smote.fit_resample(X_train, y_train)

# Feature Scaling (Gradient Boosting may not always need scaling, but for consistent performance across models)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Initialize Gradient Boosting model with some basic hyperparameters to avoid overfitting
gb_clf = GradientBoostingClassifier(random_state=42)

# Hyperparameter tuning using GridSearchCV
param_grid = {
    'n_estimators': [50, 100, 200],
    'learning_rate': [0.01, 0.1, 0.2],
    'max_depth': [3, 5, 7],
    'subsample': [0.8, 1.0],
    'max_features': ['sqrt', 'log2']
}

# Implement Grid Search with cross-validation to find the best parameters
grid_search = GridSearchCV(estimator=gb_clf, param_grid=param_grid, cv=5, n_jobs=-1, verbose=2, scoring='accuracy')
grid_search.fit(X_train, y_train)

# Best parameters found
best_params = grid_search.best_params_
print("Best Hyperparameters: ", best_params)

# Train the model with the best parameters
best_gb_clf = GradientBoostingClassifier(**best_params, random_state=42)
best_gb_clf.fit(X_train, y_train)

# Predict on the test set
y_pred = best_gb_clf.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.4f}")

# More detailed evaluation metrics
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Feature importance and interpretability using SHAP
explainer = shap.Explainer(best_gb_clf, X_train)
shap_values = explainer(X_test)

# Plot SHAP summary plot for feature importance
shap.summary_plot(shap_values, X_test)
