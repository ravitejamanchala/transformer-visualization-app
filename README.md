Based on your project structure, here's a possible **README.md** file for your transformer visualization app:

---

# Transformer Visualization App

This is a web application built for visualizing transformer asset data, providing a detailed view of voltage readings over time in a table and chart format. The project utilizes modern web technologies, including TypeScript, React, Vite, and Tailwind CSS, and offers state management, data visualization, and containerized deployment.

![Project Preview](./public/ScreenRecording.mp4)
## Features

- **Line Chart Visualization**: Displays the last ten voltage readings of transformers.
- **Data Table**: Presents transformer asset data in a structured tabular format.
- **Containerized Deployment**: Easily deployable using Docker.
- **Modern Frontend Stack**: Utilizes React, TypeScript, Tailwind CSS, and Vite for fast and scalable development.

## Technologies Used

- **React**: ^18.3.1
- **TypeScript**: ^5.5.3
- **Vite**: ^5.4.1
- **Tailwind CSS**: ^3.4.13
- **MUI** (Material UI) for UI components: ^6.1.1
- **Nivo** for chart visualization: ^0.87.0
- **Redux Toolkit** for state management: ^2.2.7
- **Docker** for containerization

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ravitejamanchala/transformer-visualization-app.git
   ```

2. Install the dependencies:

   ```bash
   cd transformer-visualization-app
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build the project for production:

   ```bash
   npm run build
   ```

5. Preview the production build:

   ```bash
   npm run preview
   ```

## Scripts

- `npm run dev`: Starts the development server with Vite.
- `npm run build`: Builds the project using TypeScript and Vite for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Previews the production build using Vite.


## Data Visualization

The app uses **Nivo** (`@nivo/line`) for rendering responsive and customizable line charts to display the voltage readings over time. The data is fed into the chart via the app's state management system.

## Styling

The UI is styled using **Tailwind CSS** (`^3.4.13`), which allows for fast and responsive styling. Additionally, **MUI** is used for pre-built components, providing a consistent and accessible design system.

## Docker Support

The app is fully containerized using Docker. To build and run the Docker container, use the following commands:

```bash
docker build -t transformer-visualization-app .
docker run -p 3000:3000 transformer-visualization-app
```
