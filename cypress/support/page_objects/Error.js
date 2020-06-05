export class Error {
  getAndAssertErrorNotification(expectedErrorMessage) {
    cy.get('.alerts')
      .invoke('show')
      .get('[data-purpose="notification_message"] div')
      .should('contain.text', expectedErrorMessage);
  }

  assertInvalidEmailAndPassword(expectedErrorMessage) {
    this.getAndAssertErrorNotification(expectedErrorMessage);
  }

  assertMissingModuleFormRequiredField(expectedErrorMessage) {
    this.getAndAssertErrorNotification(expectedErrorMessage);
  }

  assertTrainingModuleMissing(expectedErrorMessage) {
    this.getAndAssertErrorNotification(expectedErrorMessage);
  }
}

export const error = new Error();
