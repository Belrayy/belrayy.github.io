import json
import requests

# Function to translate text using the LibreTranslate API
def translate_with_libretranslate(text, target_language, api_url):
    url = f"{api_url}/translate"
    payload = {
        "q": text,
        "source": "en",  # Source language (English)
        "target": target_language,
        "format": "text"
    }
    response = requests.post(url, data=payload)
    if response.status_code == 200:
        return response.json()["translatedText"]
    else:
        raise Exception(f"LibreTranslate API error: {response.status_code} {response.text}")

# Load JSON file
def load_json(file_path):
    with open(file_path, "r") as file:
        return json.load(file)

# Save JSON file
def save_json(data, file_path):
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

# Main function to process and translate movie overviews
def translate_overviews(input_file, output_file, target_language, api_url):
    movies = load_json(input_file)
    for movie in movies:
        try:
            print(f"Translating overview for movie: {movie['title']}...")
            movie['overview'] = translate_with_libretranslate(movie['overview'], target_language, api_url)
        except Exception as e:
            print(f"Error translating movie '{movie['title']}': {e}")
    save_json(movies, output_file)
    print(f"Translation completed. Translated file saved to {output_file}")

# Example usage
if __name__ == "__main__":
    INPUT_FILE = "input_movies.json"  # Path to the input JSON file
    OUTPUT_FILE = "translated_movies.json"  # Path to save the translated JSON file
    TARGET_LANGUAGE = "fr"  # Target language code (e.g., fr for French)
    API_URL = "http://localhost:5000"  # Replace with your LibreTranslate API URL

    translate_overviews(INPUT_FILE, OUTPUT_FILE, TARGET_LANGUAGE, API_URL)
