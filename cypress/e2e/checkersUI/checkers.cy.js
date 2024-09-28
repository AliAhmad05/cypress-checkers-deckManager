import { Checkers } from '../../support/POM/checkers'

describe('Checkers Test Suite', () => {
  beforeEach('', () => {
    cy.visit('/game/checkers/')
  })
  it('Verify if the Site is up and running', () => {
    Checkers.verifySiteIsUp()
  })
  it('Making five legal moves', () => {
    Checkers.moveOne()
    cy.verifyMove()

    Checkers.moveTwo()
    cy.verifyMove()

    Checkers.moveThree()
    cy.verifyMove()

    Checkers.moveFour()
    cy.verifyMove()

    Checkers.moveFive()
    cy.verifyMove()

    Checkers.restart()
    Checkers.verifyRestart()
  })
})