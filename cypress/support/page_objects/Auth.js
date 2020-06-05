import { navigateTo, language } from '.';

export class Auth {
  login({ email, password }) {
    navigateTo.loginPage();

    language.selectEnglishAsPreferredLanguage();

    cy.acceptCookiePolicy();

    cy.get('[type="text"]').type(email);
    cy.get('[type="password"]').type(password);
    cy.get('[type="submit"]').click();
  }

  assertLoggedInUser() {
    cy.get('#avatar').then(($avatarDiv) => {
      expect($avatarDiv).to.have.attr(
        'data-props',
        '{"name":"Michael Albert","src":null,"id":56}'
      );
    });
  }
}

export const auth = new Auth();
