import json

def fix_numeric_keys(obj):
    if isinstance(obj, dict):
        return {str(key): fix_numeric_keys(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [fix_numeric_keys(item) for item in obj]
    else:
        return obj

# Input and output file paths
input_file = "movies.json"
output_file = "movies_fixed.json"

# Load, fix, and save the JSON
try:
    with open(input_file, "r") as infile:
        data = json.load(infile)
    fixed_data = fix_numeric_keys(data)
    with open(output_file, "w") as outfile:
        json.dump(fixed_data, outfile, indent=4)
    print(f"Fixed JSON saved to {output_file}")
except json.JSONDecodeError as e:
    print(f"Error parsing JSON: {e}")
