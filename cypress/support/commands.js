import 'cypress-file-upload';

Cypress.Commands.add('assertDashboardDisplayed', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/en/trainer/my_trainings`);
});

Cypress.Commands.add('acceptCookiePolicy', () => {
  cy.get('[data-purpose="cookies_disclaimer_button"]').click({ force: true });
});

Cypress.Commands.add('controlledInputChange', (input, value) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  ).set;

  const changeInputValue = (inputToChange) => (newValue) => {
    nativeInputValueSetter.call(inputToChange[0], newValue);
    inputToChange[0].dispatchEvent(
      new Event('change', { newValue, bubbles: true })
    );
  };

  return cy.get(input).then((input) => {
    changeInputValue(input)(value);
  });
});

Cypress.Commands.add('typeDescription', (element, content) => {
  cy.window().then((win) => {
    win.CKEDITOR.instances[element].setData(content);
  });
});
