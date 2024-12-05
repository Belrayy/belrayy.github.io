#!/bin/bash

# Input JSON file
INPUT_FILE="movies_fixed.json"
# Output JSON file
OUTPUT_FILE="moviesc.json"

# Use jq to filter out "n/a" values
jq 'walk(if type == "object" or type == "array" then with_entries(select(.value != "n/a")) else . end)' "$INPUT_FILE" > "$OUTPUT_FILE"

echo "Cleaned JSON saved to $OUTPUT_FILE"
