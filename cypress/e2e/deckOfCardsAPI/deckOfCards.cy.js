import { hasBlackjack } from './POM/checkIfBlackjack'

let deckId
let drawnCards
let player1Cards
let player2Cards

const baseUrl = Cypress.env('baseUrl2')

describe('Deck of Cards Test Suite', () => {
  it('Verify if the Site is up and running', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      headers: {
        Accept: `application/json`,
        'Content-Type': `application/json`,
      },
    }).then((response) => {
      cy.wrap(response).should('have.a.property', 'status', 200)
    })
  })

  it('Get a new Deck', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/api/deck/new/`,
      headers: {
        Accept: `application/json`,
        'Content-Type': `application/json`,
      },
    }).then((response) => {
      expect(response.body.success).to.eq(true)
      deckId = response.body.deck_id
    })
  })

  it('Shuffle the Deck', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}api/deck/${deckId}/shuffle/`,
      headers: {
        Accept: `application/json`,
        'Content-Type': `application/json`,
      },
    }).then((response) => {
      expect(response.body.success).to.eq(true)
      expect(response.body.shuffled).to.eq(true)
    })
  })

  it('Deal 3 Cards to each of 2 Players', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}api/deck/${deckId}/draw/?count=6`,
      headers: {
        Accept: `application/json`,
        'Content-Type': `application/json`,
      },
    }).then((response) => {
      expect(response.body.success).to.eq(true)
      expect(response.body.remaining).to.eq(46)
      drawnCards = response.body.cards.map((card) => card.code)
      cy.log(`Drawn Cards: ${drawnCards}`)
    })
  })

  it('Add drawn cards to 2 Different Piles 2 Cards in First Pile and 1 Card in second Pile', () => {
    player1Cards = drawnCards.slice(0, 3)
    player2Cards = drawnCards.slice(3, 6)
    cy.log(`Player 1 Cards: ${player1Cards}`)
    cy.log(`Player 2 Cards: ${player2Cards}`)

    cy.request({
      method: 'GET',
      url: `${baseUrl}api/deck/${deckId}/pile/player1/add/?cards=${player1Cards}`,
      headers: {
        Accept: `application/json`,
        'Content-Type': `application/json`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      cy.wrap(response.body.piles).should('have.a.property', 'player1')
    })
    cy.request({
      method: 'GET',
      url: `${baseUrl}api/deck/${deckId}/pile/player2/add/?cards=${player2Cards}`,
      headers: {
        Accept: `application/json`,
        'Content-Type': `application/json`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      cy.wrap(response.body.piles).should('have.a.property', 'player2')
    })
  })

  it('Check whether either has Blackjack', () => {
    // I don't know what's a blackjack, tried to learn it from youtube // google but don't know how to play it with 3 cards
    // Since, I didn't know the whole scenario, if I have to use only two cards and throw 1 card away or just leave it as it is
    // and play with 3 cards and put a condition that my first card should be 1, the other two remaining cards should be equal to 10 each
    // or raise this question that is blackjack possible with 3 cards?

    cy.request('GET', `${baseUrl}api/deck/${deckId}/pile/player1/list`).then((response) => {
      const playerOneCards = response.body.piles.player1.cards
      const playerOneCardCodes = playerOneCards.map((card) => card.code)
      cy.wrap(playerOneCardCodes).should('deep.equal', player1Cards)

      const playerOneValue = response.body.piles.player1.cards
      const player1Value = playerOneValue.map((card) => card.value)
      cy.log(`Player 1 Card Values: ${player1Value}`)
      const hasBlackjackResult = hasBlackjack(player1Value)

      if (hasBlackjackResult) {
        cy.log('The hand has Blackjack!')
      } else {
        cy.log('The hand does not have Blackjack.')
      }
    })

    cy.request('GET', `${baseUrl}api/deck/${deckId}/pile/player2/list`).then((response) => {
      const playerTwoCards = response.body.piles.player2.cards
      const playerTwoCardCodes = playerTwoCards.map((card) => card.code)
      cy.wrap(playerTwoCardCodes).should('deep.equal', player2Cards)

      const playerTwoValue = response.body.piles.player2.cards
      const player2Value = playerTwoValue.map((card) => card.value)
      cy.log(`Player 2 Card Values: ${player2Value}`)
      const hasBlackjackResult = hasBlackjack(player2Value)

      if (hasBlackjackResult) {
        cy.log('The hand has Blackjack!')
      } else {
        cy.log('The hand does not have Blackjack.')
      }
    })
  })
})
