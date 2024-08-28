#!/bin/bash

# Define the base directory containing the fMRI data
SOURCE_DIR="/mnt/c/preprocess2"

# Define the destination directory where you want to copy the normalized files
DEST_DIR="/mnt/c/preprocess2/normalized_files"

# Create the destination directory if it does not exist
mkdir -p "$DEST_DIR"

# Loop through each subject folder
for subject_folder in $SOURCE_DIR/sub-*; do
    echo "Processing $subject_folder..."
    # Define the path to the func directory
    FUNC_DIR="$subject_folder/ses/func"
    if [[ -d "$FUNC_DIR" ]]; then
        # Use find to handle file copying to avoid issues with globbing in cp command
        find "$FUNC_DIR" -type f -name "*_normalized.nii.gz" -exec cp {} "$DEST_DIR/" \;
    else
        echo "Functional directory not found for $subject_folder"
    fi
done

echo "All normalized files have been copied to $DEST_DIR"
