import json
import requests

# Load JSON file
input_file = "updated_movies.json"  # Replace with your JSON file name
output_file = "cleaned_movies.json"

# Function to check if a URL is valid
def is_valid_url(url):
    try:
        response = requests.head(url, timeout=5)  # Send a HEAD request
        return response.status_code == 200  # Check if the status code is 200 (OK)
    except requests.RequestException:
        return False

# Open the JSON file
with open(input_file, "r", encoding="utf-8") as file:
    movies = json.load(file)

# List to store valid movies
valid_movies = []

# Verify each movie's poster URL
for movie in movies:
    poster_path = movie.get("poster_path")
    if poster_path and is_valid_url(poster_path):
        valid_movies.append(movie)  # Keep the movie if the poster URL is valid
    else:
        print(f"Removing movie: {movie['title']} - Invalid poster URL")

# Save the cleaned JSON back to a file
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(valid_movies, file, indent=4, ensure_ascii=False)

print(f"Cleaned JSON saved to {output_file}")
