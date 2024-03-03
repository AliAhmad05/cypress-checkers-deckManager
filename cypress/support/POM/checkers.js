import assertions from '../../fixtures/assertions'
import { locatorChecker } from "../POM/locators/locators";

class checkers {
  verifySiteIsUp() {
    cy.request('/game/checkers/').its('status').should('eq', 200)
  }

  moveOne() {
    cy.makeAMove(22, 13)
  }

  moveTwo() {
    cy.makeAMove(31, 22)
  }

  moveThree() {
    cy.makeAMove(42, 33)
  }

  moveFour() {
    cy.makeAMove(51, 33)
  }

  moveFive() {
    cy.makeAMove(33, 55)
  }

  restart() {
    cy.contains('Restart...').click()
  }

  verifyRestart() {
    cy.get(locatorChecker.message).should('contain', assertions.restart)
  }
}
export const Checkers = new checkers()