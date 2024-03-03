## Owner

The code in the repo is written by https://github.com/AliAhmad05

## File Structure
└── 📁cypress
    └── 📁downloads
    └── 📁e2e
        └── 📁checkersUI
            └── checkers.cy.js
        └── 📁deckOfCardsAPI
            └── 📁POM
                └── checkIfBlackjack.js
            └── deckOfCards.cy.js
    └── 📁fixtures
        └── assertions.js
    └── 📁support
        └── 📁POM
            └── checkers.js
            └── 📁locators
                └── locators.js
        └── commands.js
        └── e2e.js
└── cypress.config.js
└── file.docx
└── package-lock.json
└── package.json

### Prerequisites

Ensure you have Node.js installed. If not, download and install it from [Node.js official website](https://nodejs.org/).

### Installation

1. Navigate to the project directory.
2. Install the required dependencies:

`npm install`

## Running Tests

### UI Mode

To run the tests in UI mode:

`npx cypress open`

### Headless Mode

To run the tests in headless mode:

`npx cypress run`
