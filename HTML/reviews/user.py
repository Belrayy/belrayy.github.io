import json
import random

# Define a list of random users
users = ["Alice", "Bob", "Charlie", "Dave", "Eve"]

# Load the JSON file
with open('reviews_fr.json', 'r') as file:
    data = json.load(file)

# Assign a random user to each review
for movie in data:
    if 'reviews' in movie:
        movie['reviews'] = [{"review": review, "user": random.choice(users)} for review in movie['reviews']]

# Save the updated JSON back to the file
with open('reviews_fr.json', 'w') as file:
    json.dump(data, file, indent=4)

print("Reviews updated with random users.")