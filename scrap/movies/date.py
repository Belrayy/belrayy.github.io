import json
from datetime import datetime

# Load JSON file
input_file = "movies_cleaned.json"  # Replace with your JSON file name
output_file = "updated_movies.json"

# Open the JSON file
with open(input_file, "r", encoding="utf-8") as file:
    movies = json.load(file)

# Loop through each movie and update the release_date
for movie in movies:
    if "release_date" in movie and movie["release_date"]:
        try:
            # Parse the date in the original format
            original_date = datetime.strptime(movie["release_date"], "%d %b %Y")
            # Reformat the date to DD/MM/YYYY
            new_date = original_date.strftime("%d/%m/%Y")
            movie["release_date"] = new_date
        except ValueError:
            print(f"Invalid date format for movie: {movie['title']}")

# Save the updated JSON back to a file
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(movies, file, indent=4, ensure_ascii=False)

print(f"Updated JSON saved to {output_file}")
