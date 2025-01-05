import json
import random

# Pool de 20 critiques fictives en français
FAKE_REVIEWS = [
    "Un chef-d'œuvre absolu ! Ça m'a laissé sans voix.",
    "Une narration brillante avec des performances incroyables.",
    "Un des meilleurs films que j'ai jamais vu.",
    "Un classique intemporel que tout le monde devrait voir.",
    "L'intrigue était captivante du début à la fin.",
    "Une réalisation incroyable et une cinématographie exceptionnelle.",
    "Une montagne russe émotionnelle qui reste en tête.",
    "Un peu surestimé, mais ça vaut le détour.",
    "Des acteurs fantastiques, mais le rythme était parfois lent.",
    "Fortement recommandé pour les fans du genre.",
    "Ce film est véritablement une œuvre d'art.",
    "Un excellent mélange de drame, d'action et de suspense.",
    "Un peu lent, mais la fin en valait la peine.",
    "Une attention incroyable aux détails et au développement des personnages.",
    "Une belle histoire d'espoir et de résilience.",
    "Cela a dépassé toutes mes attentes.",
    "Pas aussi génial qu'on le dit, mais quand même bon.",
    "Une narration puissante avec des moments inoubliables.",
    "Un incontournable pour tous les amateurs de cinéma.",
    "Je pourrais regarder ce film encore et encore !"
]

def generate_reviews(input_file, output_file):
    try:
        # Charger le fichier JSON d'entrée
        with open(input_file, 'r') as infile:
            movies = json.load(infile)

        # Ajouter des critiques pour chaque film
        for movie in movies:
            movie["reviews"] = random.sample(FAKE_REVIEWS, 3)

        # Enregistrer le fichier JSON de sortie
        with open(output_file, 'w') as outfile:
            json.dump(movies, outfile, indent=4, ensure_ascii=False)

        print(f"Fichier de sortie enregistré : {output_file}")
    except Exception as e:
        print(f"Erreur : {e}")

# Exemple d'utilisation
input_file = "../../scrap/movies/cleaned_movies_fr.json"  # Remplacez par le chemin de votre fichier d'entrée
output_file = "reviews_fr.json"  # Remplacez par le chemin de votre fichier de sortie

generate_reviews(input_file, output_file)
