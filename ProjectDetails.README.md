# News Summary Front-End Documentation

## Table of Contents
1. [Overview](#overview)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [API Endpoints](#api-endpoints)
7. [Components](#components)
8. [Redux Setup](#redux-setup)
9. [Usage](#usage)
10. [Contributing](#contributing)
11. [License](#license)

## Overview
The News Summary Front-End application fetches news articles based on user queries and date filters. It uses Material-UI for pagination and components, Redux Toolkit for state management, and Axios for API calls. Users can search for news articles, filter by date, and view summaries of articles.

## Installation

### Prerequisites
- Node.js
- npm

### Steps
1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd news-summary-FE
    ```

2. Install dependencies:
    ```sh
    npm install
    ```
## Running the Application

```sh
npm start
```

## Project Structure:

```bash

src/
│
├── assets/          # Images and other assets
├── components/      # React components
│   ├── NewsCard
|           |--NewsCard.jsx
|           |--NewsCard.css
│   └── NewsList
|           |--NewsList.jsx
|           |--NewsList.css
│
├── redux/           # Redux setup
│   ├── store.js
│   └── newsSlice.js
│
├── App.js           # Main App component
├── index.js         # Entry point
└── ...

```

## Components

### NewsCard.jsx
#### Displays individual news articles and their summaries.

Props:
- article: Object containing article details.

### NewsList.jsx
#### Handles the search, date filters, pagination, and displays a list of NewsCard components.

## Usage:
### Searching for Articles:
1) Enter a search query in the search bar.
2) Optionally set date filters.
3) View the list of articles and paginate through the results.

### Viewing Summaries:
1) Click the "Summary" button on a NewsCard to view the summary.
2) The summary is cached, so subsequent views do not require re-fetching.