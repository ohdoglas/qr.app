# QR.APP

## Description

The **QR.APP** is a simple service that allows for the generation of QR Codes from provided URLs. The API is built with Node.js and Express and uses JavaScript and TypeScript for development. The front end is created with HTML and CSS to enable basic interaction with the API.

## Technologies

- **JavaScript/TypeScript**: Programming languages used for the project's development.
- **Node.js**: JavaScript runtime environment.
- **Express**: Framework for Node.js that facilitates the creation of APIs.
- **HTML/CSS**: Used to create a simple web interface.
- **QR Code Library**: Library for generating QR Codes (e.g., `qrcode` for Node.js).

## Features

- **QR Code Generation**: Creates QR Codes from URLs provided through the API.
- **API Service**: Provides an endpoint for generating QR Codes.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ohdoglas/qrcode-generator.git
   cd qrcode-generator
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the server:**

   ```bash
   npm start
   ```

   The server will start at `http://localhost:3000`.

## Usage

### Endpoint for QR Code Generation

- **URL:** `/api/generate`
- **Method:** `POST`
- **Parameters:**
  - `url` (string, required): The link for which you want to generate a QR Code.

- **Request example:**

  ```json
  {
    "url": "https://example.com"
  }
  ```

- **Response example:**

  The API will return an image of the QR Code that can be displayed or downloaded by the client.

### Web Interface

The simple web interface allows the insertion of a URL and the viewing of the generated QR Code directly in the browser.

## Contribution

Contributions are welcome! Please open an *issue* or submit a *pull request* with improvements or corrections.

## Contact

- **Author:** Douglas Morais  
- **Email:** dughlaisdd@gmail.com
- **GitHub:** [ohdoglas](https://github.com/ohdoglas)
