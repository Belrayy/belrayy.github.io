import json

def fix_numeric_keys_and_clean(obj):
    """
    Recursively fix numeric keys (convert to strings) and remove:
      - Entire dictionaries if any value is "n/a" or "N/A".
      - Entries with value "n/a" or "N/A" from lists or dictionaries.
    """
    if isinstance(obj, dict):
        # Check if any value in the dictionary is "n/a" or "N/A"
        if any(value in ["n/a", "N/A"] for value in obj.values()):
            return None  # Remove the entire dictionary
        return {
            str(key): fix_numeric_keys_and_clean(value)
            for key, value in obj.items()
            if fix_numeric_keys_and_clean(value) is not None
        }
    elif isinstance(obj, list):
        # Process each item in the list and remove any None or "n/a"/"N/A"
        return [
            fix_numeric_keys_and_clean(item)
            for item in obj
            if item not in ["n/a", "N/A"] and fix_numeric_keys_and_clean(item) is not None
        ]
    else:
        # For other types, return as-is
        return obj

# Input and output file paths
input_file = "movies.json"
output_file = "movies_cleaned.json"

try:
    # Load the JSON file
    with open(input_file, "r") as infile:
        data = json.load(infile)

    # Fix numeric keys and clean the data
    cleaned_data = fix_numeric_keys_and_clean(data)

    # Save the cleaned JSON
    with open(output_file, "w") as outfile:
        json.dump(cleaned_data, outfile, indent=4)

    print(f"Cleaned JSON saved to {output_file}")
except json.JSONDecodeError as e:
    print(f"Error parsing JSON: {e}")
