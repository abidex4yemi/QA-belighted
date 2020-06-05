/// <reference types="cypress" />
import { auth, error } from '../support/page_objects';

describe('Login page [Test suite]', () => {
  it('should log in an existing user with valid email/password', () => {
    const email = Cypress.env('email');
    const password = Cypress.env('password');

    auth.login({ email, password });
    cy.assertDashboardDisplayed();
    auth.assertLoggedInUser();
  });

  it('should display error message if email/password are incorrect', () => {
    const email = 'invalid';
    const password = 'invalid';

    auth.login({ email, password });
    const expectedErrorMessage = 'Courriel ou mot de passe incorrect';
    error.assertInvalidEmailAndPassword(expectedErrorMessage);
  });
});
