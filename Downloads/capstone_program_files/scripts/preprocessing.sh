#!/bin/bash

# Define the base directory containing the fMRI data
BASE_DIR="/mnt/c/preprocess"

# Loop through each subject folder
for subject in $(ls $BASE_DIR); do
    echo "Processing $subject"
    SESSION_DIR="$BASE_DIR/$subject/ses/func"
    if [[ -d $SESSION_DIR ]]; then
        cd $SESSION_DIR
        INPUT_FILE=$(ls *task-rest_bold.nii.gz 2>/dev/null)
        if [[ -n $INPUT_FILE ]]; then
            echo "Found input file: $INPUT_FILE"

            # Processing steps
            slicetimer -i $INPUT_FILE -o ${INPUT_FILE%%.*}_stc.nii.gz --repeat=2 --down
            mcflirt -in ${INPUT_FILE%%.}_stc.nii.gz -out ${INPUT_FILE%%.}_mc.nii.gz
            fslroi ${INPUT_FILE%%.}_mc.nii.gz ${INPUT_FILE%%.}_mc_first.nii.gz 0 1
            flirt -in ${INPUT_FILE%%.}_mc_first.nii.gz -ref $FSLDIR/data/standard/MNI152_T1_2mm_brain.nii.gz -out ${INPUT_FILE%%.}_normalized.nii.gz -omat ${INPUT_FILE%%.*}_affine.mat
            fslmaths ${INPUT_FILE%%.}_normalized.nii.gz -s 2 ${INPUT_FILE%%.}_smoothed.nii.gz
        else
            echo "No fMRI file found in $SESSION_DIR"
        fi
    else
        echo "Session directory $SESSION_DIR does not exist."
    fi
done

echo "Preprocessing complete for all subjects."