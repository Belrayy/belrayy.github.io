# LetterboxB Website

**LetterboxB** is a movie and TV show website designed to provide users with information about popular movies, reviews, and more. The site includes a multi-language option and connects to the OMDb API for movie data.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Overview

LetterboxB is a responsive movie platform showcasing:
- A **popular movies section**.
- Links to **reviews** and **movie/show details**.
- Support for **language switching** (English and French).
- A **footer** with additional resources and API attribution.

This website is built using HTML, CSS, and JavaScript.

---

## Features

1. **Navigation Bar**:
   - Logo linking to the homepage.
   - Links to:
     - Sign-in/Log in
     - Movies & Shows
     - Reviews
   - Admin link.

2. **Popular Movies Section**:
   - Displays a grid of the latest popular movies.

3. **Footer**:
   - Links to:
     - About
     - Apps
     - Help
     - API attribution (OMDb)
     - Contact
   - Language switcher (English and French flags).

4. **API Integration**:
   - OMDb API is used as the data source for movie information.

---

## Project Structure

1. **Main page**:
    -Index.
2. **Movies**:
    -All the movies located in the json database.
    -All scraped with node.js and cleaned with python script.
    -English database.
    -French database translated with libretranslate.
3. **Sign in/Login**:
    -Sign up overlay.
    -Log in overlay.
    -Admin and Normal user type of accounted located in a json file.
4. **Admin**:
    -Add and remove accounts.
    -Add and remove movies.
    -Add and remove reviews.
5. **Reviews**:
    -20 reviews ai-generated.
    -3 randoms reviews in english.
    -3 randoms reviews in french.


