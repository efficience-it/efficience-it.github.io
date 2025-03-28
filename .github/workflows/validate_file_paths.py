import os
import sys
import json

EXPECTED_FILES_JSON = ".github/workflows/expected_files.json"

def validate_files(repo_name, json_key):
    """ Checks that ALL files in 'data/' are listed in expected_files.json """

    if not os.path.exists(EXPECTED_FILES_JSON):
        print(f"❌ ERROR: The file {EXPECTED_FILES_JSON} does not exist.")
        sys.exit(1)

    with open(EXPECTED_FILES_JSON, "r", encoding="utf-8") as file:
        try:
            filenames = json.load(file)
        except json.JSONDecodeError as e:
            print(f"❌ ERROR: The JSON file cannot be read : {e}")
            sys.exit(1)

    if json_key not in filenames or not isinstance(filenames[json_key], list):
        print(f"❌ ERROR: The JSON file must contain a '{json_key}' key with a list.")
        sys.exit(1)

    expected_files = set(filenames[json_key])
    repo_path = os.path.join(repo_name, "data")

    if not os.path.exists(repo_path):
        print(f"❌ ERROR: The directory '{repo_path}' does not exist.")
        sys.exit(1)

    actual_files = set()

    for root, dirs, files in os.walk(repo_path):
        for file in files:
            relative_path = os.path.relpath(os.path.join(root, file), repo_path)
            actual_files.add(relative_path)

    unexpected_files = actual_files - expected_files

    if unexpected_files:
        print(f"❌ The following files are in '{repo_path}/' but NOT listed in {EXPECTED_FILES_JSON} :")
        for f in unexpected_files:
            print(f"   - {f}")
        sys.exit(1)

    print(f"✅ All files in '{repo_path}' are correctly listed in {EXPECTED_FILES_JSON} !")
    sys.exit(0)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("❌ ERROR: Usage -> python validate_file_paths.py <repo_name> <json_key>")
        sys.exit(1)

    repo_name = sys.argv[1]
    json_key = sys.argv[2]
    validate_files(repo_name, json_key)
