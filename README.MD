# LetterboxB Website

**LetterboxB** is a movie and TV show website designed to provide users with information about popular movies, reviews, and more. The site supports multilingual content and connects to the OMDb API for movie data. It includes admin functionalities and AI-generated reviews.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Overview

LetterboxB is a responsive movie platform showcasing:
- A **popular movies section**.
- Links to **reviews**, **movie/show details**, and **admin functionalities**.
- Support for **language switching** (English and French).
- AI-generated reviews in both languages.
- Admin controls for managing movies, reviews, and user accounts.

This website is built using HTML, CSS, JavaScript, Node.js, and Python.

---

## Features

1. **Navigation Bar**:
   - Logo linking to the homepage.
   - Links to:
     - `Sign-in/Log in`
     - Movies & Shows
     - Reviews
     - Admin Panel (for admin users only).

2. **Popular Movies Section**:
   - Displays a grid of the latest popular movies.

3. **Multilingual Support**:
   - English and French versions of the database, with translations powered by **LibreTranslate**.

4. **Admin Functionalities**:
   - Manage user accounts (add/remove).
   - Manage movies (add/remove).
   - Manage reviews (add/remove).

5. **AI-Generated Reviews**:
   - 20 AI-generated reviews available.
   - Randomly displays:
     - 3 reviews in English.
     - 3 reviews in French.

6. **Footer**:
   - Links to About, Apps, Help, API attribution, and Contact.

7. **API Integration**:
   - OMDb API is used as the data source for movie information.

---

## Project Structure

1. **Main Page**:
    - The `index.html` file serves as the main entry point.

2. **Movies**:
    - Contains all movies from a JSON database.
    - Movies are scraped using **Node.js** and cleaned using a **Python script**.
    - Includes two separate databases:
        - **English database**.
        - **French database** translated using **LibreTranslate**.

3. **Sign In/Login**:
    - Features an overlay for signing up and logging in.
    - Supports two types of accounts:
        - **Admin**
        - **Normal user**
    - User account details are stored in a JSON file.

4. **Admin**:
    - Admin panel functionalities:
        - Add and remove user accounts.
        - Add and remove movies.
        - Add and remove reviews.

5. **Reviews**:
    - Contains 20 AI-generated reviews.
    - Randomly displays:
        - 3 English reviews.
        - 3 French reviews.

---

## Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/Belrayy/belrayy.github.io.git
