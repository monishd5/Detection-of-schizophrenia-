import numpy as np
import pickle
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Load the combined dataset from the pickle file
file_path = 'E:\capstone\Phase 2\capstone.pkl'
with open(file_path, 'rb') as file:
    combined_data = pickle.load(file)

# Separate features and labels
X = combined_data.drop('Label', axis=1)
y = combined_data['Label']

# Convert labels to categorical (binary classification: 0, 1)
y = to_categorical(y, num_classes=2)

# Reshape the features to fit the CNN (samples, height, width, channels)
# Assuming the feature vector length is 25088 (7x7x512 from VGG16) - Reshape to (7, 7, 512)
X = np.array(X)
X = X.reshape(-1, 7, 7, 512)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


# Define a CNN model with padding to prevent spatial size reduction
model = Sequential()

# First Conv2D layer (with 'same' padding to preserve spatial dimensions)
model.add(Conv2D(32, (3, 3), activation='relu', padding='same', input_shape=(7, 7, 512)))
model.add(MaxPooling2D(pool_size=(2, 2)))

# Second Conv2D layer (use 'same' padding)
model.add(Conv2D(64, (3, 3), activation='relu', padding='same'))
model.add(MaxPooling2D(pool_size=(2, 2)))

# Flatten the output
model.add(Flatten())

# Fully connected layers
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))  # Regularization
model.add(Dense(64, activation='relu'))

# Output layer for binary classification
model.add(Dense(2, activation='softmax'))

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Model summary to check the layer structure
model.summary()


# Train the model
history = model.fit(X_train, y_train, epochs=10, batch_size=32, validation_split=0.2)

# Evaluate the model on the test set
test_loss, test_accuracy = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {test_accuracy}")

# Predict on the test set
y_pred = model.predict(X_test)
y_pred_classes = np.argmax(y_pred, axis=1)
y_test_classes = np.argmax(y_test, axis=1)

# Print classification report
print(classification_report(y_test_classes, y_pred_classes))
