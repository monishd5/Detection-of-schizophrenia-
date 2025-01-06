import os
import shutil

# Define the paths
base_dir = r'Documents\capstone\finaldatasetcapstone\finaldatasetcapstone'
sliced61_dir = os.path.join(base_dir, 'sliced61')
positive_dir = os.path.join(base_dir, 'positive')
negative_dir = os.path.join(base_dir, 'negative')

# Create directories for positive and negative data
os.makedirs(positive_dir, exist_ok=True)
os.makedirs(negative_dir, exist_ok=True)

# List of subject IDs for positive and negative groups
positive_subject_ids = [
    "sub-A00000368", "sub-A00000456", "sub-A00000541", "sub-A00000838", "sub-A00000909", "sub-A00001181",
    "sub-A00001243", "sub-A00001251", "sub-A00001452", "sub-A00002405", "sub-A00002480", "sub-A00004507",
    "sub-A00006754", "sub-A00009280", "sub-A00009656", "sub-A00012767", "sub-A00013216", "sub-A00014175",
    "sub-A00014590", "sub-A00014607", "sub-A00014636", "sub-A00014719", "sub-A00014804", "sub-A00014830",
    "sub-A00015201", "sub-A00015518", "sub-A00015648", "sub-A00016197", "sub-A00016720", "sub-A00016723",
    "sub-A00017147", "sub-A00018129", "sub-A00018317", "sub-A00018403", "sub-A00018434", "sub-A00018598",
    "sub-A00018979", "sub-A00019293", "sub-A00019349", "sub-A00019750", "sub-A00020414", "sub-A00020416",
    "sub-A00020602", "sub-A00020787", "sub-A00021591", "sub-A00021598", "sub-A00022500", "sub-A00023132",
    "sub-A00023158", "sub-A00023243", "sub-A00023246", "sub-A00023366", "sub-A00023590", "sub-A00023750",
    "sub-A00024198", "sub-A00024228", "sub-A00024510", "sub-A00024568", "sub-A00024684", "sub-A00024953",
    "sub-A00024959", "sub-A00027119", "sub-A00027391", "sub-A00027410", "sub-A00027537", "sub-A00027616",
    "sub-A00027755", "sub-A00027969", "sub-A00028189", "sub-A00028303", "sub-A00028402", "sub-A00028404",
    "sub-A00028405", "sub-A00028408", "sub-A00028410", "sub-A00028805", "sub-A00028806", "sub-A00029486",
    "sub-A00031186", "sub-A00031271", "sub-A00031597", "sub-A00034273", "sub-A00035003", "sub-A00035836",
    "sub-A00035859", "sub-A00037034", "sub-A00037224", "sub-A00037619", "sub-A00037649", "sub-A00037854",
    "sub-A00038172", "sub-A00038441", "sub-A00038624"
]

negative_subject_ids = [
    "sub-A00000300", "sub-A00002198", "sub-A00003150", "sub-A00004087", "sub-A00007409", "sub-A00009946",
    "sub-A00010150", "sub-A00010684", "sub-A00011265", "sub-A00011725", "sub-A00012995", "sub-A00013140",
    "sub-A00013363", "sub-A00013816", "sub-A00014120", "sub-A00014225", "sub-A00014522", "sub-A00014839",
    "sub-A00014898", "sub-A00015759", "sub-A00015826", "sub-A00017294", "sub-A00018335", "sub-A00018553",
    "sub-A00018716", "sub-A00019888", "sub-A00020805", "sub-A00020895", "sub-A00020968", "sub-A00020984",
    "sub-A00021058", "sub-A00021072", "sub-A00021081", "sub-A00021085", "sub-A00021145", "sub-A00022400",
    "sub-A00022490", "sub-A00022509", "sub-A00022592", "sub-A00022619", "sub-A00022653", "sub-A00022687",
    "sub-A00022727", "sub-A00022729", "sub-A00022773", "sub-A00022810", "sub-A00022835", "sub-A00022837",
    "sub-A00022915", "sub-A00023095", "sub-A00023120", "sub-A00023131", "sub-A00023143", "sub-A00023330",
    "sub-A00023337", "sub-A00023730", "sub-A00023800", "sub-A00023848", "sub-A00023866", "sub-A00024160",
    "sub-A00024301", "sub-A00024372", "sub-A00024446", "sub-A00024535", "sub-A00024546", "sub-A00024663",
    "sub-A00024820", "sub-A00024932", "sub-A00024955", "sub-A00025969", "sub-A00026907", "sub-A00026945",
    "sub-A00027487", "sub-A00027787", "sub-A00028052", "sub-A00028406", "sub-A00028409", "sub-A00029226",
    "sub-A00029452", "sub-A00031478", "sub-A00031764", "sub-A00033214", "sub-A00035751", "sub-A00036049",
    "sub-A00036555", "sub-A00036844", "sub-A00036897", "sub-A00036916", "sub-A00037007", "sub-A00037238",
    "sub-A00037318", "sub-A00037495", "sub-A00037564", "sub-A00037665"
]

# Function to move files based on subject IDs
def move_files(subject_ids, destination_folder):
    for subject_id in subject_ids:
        # Attempt to match the file name with any session date
        for file_name in os.listdir(sliced61_dir):
            if subject_id in file_name:
                source_path = os.path.join(sliced61_dir, file_name)
                shutil.move(source_path, destination_folder)
                break  # Move on to the next subject ID once a match is found

# Move positive and negative files
move_files(positive_subject_ids, positive_dir)
move_files(negative_subject_ids, negative_dir)

# Verify the number of files moved
print(f"Positive files moved: {len(os.listdir(positive_dir))}")
print(f"Negative files moved: {len(os.listdir(negative_dir))}")
