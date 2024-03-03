class LocatorChecker {
  message = '[id="message"]'

  elements = {
    pick: (pick) => cy.get(`[name="space${pick}"]`).click(),
    drop: (drop) => cy.get(`[name="space${drop}"]`).click(),
  }
}
export const locatorChecker = new LocatorChecker();