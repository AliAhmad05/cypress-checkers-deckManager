import assertions from '../fixtures/assertions'
import { locatorChecker } from './POM/locators/locators'

Cypress.Commands.add('verifyMove', () => {
  cy.get(locatorChecker.message).should('contain', assertions.move)
  cy.wait(2000) // I wanted to use implicit wait instead of this explicit but due to lack of time, I have to leave this as it is
})

Cypress.Commands.add('makeAMove', (startingPos, endingPos) => {
  locatorChecker.elements.pick(startingPos)
  locatorChecker.elements.drop(endingPos)
})
