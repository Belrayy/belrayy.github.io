import json
import random

# Predefined pool of 20 fake reviews
FAKE_REVIEWS = [
    "An absolute masterpiece! It left me speechless.",
    "Brilliant storytelling with incredible performances.",
    "One of the best movies I've ever seen.",
    "A timeless classic that everyone should watch.",
    "The plot was gripping from start to finish.",
    "Amazing direction and outstanding cinematography.",
    "An emotional rollercoaster that stayed with me.",
    "A bit overrated, but still worth a watch.",
    "Fantastic acting, but the pacing felt off at times.",
    "Highly recommended for fans of the genre.",
    "This movie is truly a work of art.",
    "A great mix of drama, action, and suspense.",
    "It felt a bit slow, but the ending made up for it.",
    "Incredible attention to detail and character development.",
    "A beautiful story of hope and resilience.",
    "It exceeded all my expectations.",
    "Not as great as people say, but still good.",
    "A powerful narrative with unforgettable moments.",
    "A must-watch for every cinema lover.",
    "Could watch this over and over again!"
]

def generate_reviews(input_file, output_file):
    try:
        # Load input JSON
        with open(input_file, 'r') as infile:
            movies = json.load(infile)

        # Process each movie and add reviews
        for movie in movies:
            movie["reviews"] = random.sample(FAKE_REVIEWS, 3)

        # Save output JSON
        with open(output_file, 'w') as outfile:
            json.dump(movies, outfile, indent=4)

        print(f"Output saved to {output_file}")
    except Exception as e:
        print(f"Error: {e}")

# Example usage
input_file = "../../scrap/movies/cleaned_movies.json"  # Replace with your input file path
output_file = "reviews.json"  # Replace with your desired output file path

generate_reviews(input_file, output_file)
