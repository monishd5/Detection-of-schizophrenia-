#!/bin/bash

# Define input and output directories
input_dir="/path/to/dicom/folder"   # Path to your DICOM files
output_dir="/path/to/output/folder" # Path where NIfTI files will be saved

# Create the output directory if it doesn't exist
mkdir -p "$output_dir"

# Run the conversion
dcm2niix -z y -o "$output_dir" "$input_dir"

echo "DICOM to NIfTI conversion completed."
