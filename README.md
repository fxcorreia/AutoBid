# AutoBid

This project is a React Native application designed for displaying vehicle results with filtering options. Users can view a list of vehicles, mark them as favorites, and filter the results based on specific criteria. The application utilizes lazy loading to optimize performance and Redux Toolkit for state management.

## Problem Statement
Vehicle Results and Filtering
You are tasked with implementing a simple vehicle results page in React Native, based on a provided dataset of vehicles. The dataset includes various properties for each vehicle, such as make, model, engine size, fuel type, year, mileage, auction date and time, starting bid, and a favorite status.

## Key Features
- Dashboard: Displays a list of all available vehicles.
    - Lazy Loading: Optimizes loading times by not rendering the entire vehicle list at once.
    - Favorite Functionality: Users can mark vehicles as favorites by clicking the favorite button.
    - Vehicle Details: Clicking on a vehicle opens a detailed view displaying additional information.
- Filtering Options: Users can filter vehicles based on:
    - Make
    - Model
    - Starting bid range (minimum and maximum)
    - Only show favorite vehicles
- Favorites View: Accessible through a Drawer menu, displaying a list of all favorite vehicles.
    - Allows quick access to details of favorite vehicles.
    - Displays the total number of favorite vehicles.
- State Management: Utilizes Redux Toolkit for efficient state management, encapsulated in a dedicated slice for vehicles.

## Project Structure
    /src
        /app
            /components        // Reusable components
            /screens           // Screens for different views
            /styles            // Styles for the application
            App.js             // Main application file
        /assets                // Assets like fonts images and SVGs
        /data
            /redux             // Redux slice for vehicle management
            /model             // Project Models
            vehicles.json      // JSON file containing vehicle data
        /i18n
            translations.json

## Getting Started
 - Clone the repository
    ```
    git clone https://github.com/fxcorreia/AutoBid.git
    cd AutoBid
    ```

 - Install dependencies
    ```
    npm install
    # or
    yarn install
    ```

 - Run the application
    ```
    npm start
    # or
    yarn start
    ```

## Usage
- Upon launching the app, you will be greeted with the Dashboard displaying a list of vehicles.
- Use the filtering options to narrow down the vehicle results.
- Click on the favorite icon to mark a vehicle as favorite or remove it from favorites.
- Tap on any vehicle to view its details.
- Access the favorites list through the Drawer menu for a quick overview.

## Technology Stack
- React Native: Framework for building the mobile application.
- Redux Toolkit: State management library for managing vehicle data.
- React Navigation: Navigation library to manage different screens.
- Jest: Testing framework for unit tests.
- React Native Testing Library: For testing React Native components.

