export class Language {
  selectEnglishAsPreferredLanguage() {
    cy.get('a[data-purpose="zone_dropdown_button"]')
      .trigger('mousedown')
      .get('[role="menu"]')
      .invoke('show')
      .get('a[href="/en/users/sign_in"]')
      .click({ force: true })
      .then(() => {
        cy.get('[data-purpose="zone_dropdown_button"]')
          .find('[alt="en"]')
          .then(($img) => {
            expect($img).to.have.attr('alt', 'en');
          });
      });
  }
}

export const language = new Language();
