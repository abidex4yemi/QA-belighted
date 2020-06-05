export class Navigation {
  loginPage() {
    cy.visit('/');
  }

  createTrainingPage() {
    cy.get('[aria-label="add_circle"]')
      .trigger('mousedown')
      .get('[data-purpose="create_new_training_button"]')
      .click({ force: true });
  }

  createModulePage() {
    cy.get('[aria-label="add_circle"]')
      .trigger('mousedown')
      .get('[data-purpose="create_new_protomodule_button"]')
      .click({ force: true });
  }

  viewAllModulesPage() {
    cy.get('[data-purpose="go_to_my_modules_link"]')
      .click()
      .then(() => {});
  }

  viewAllTrainingPage() {
    cy.visit('/');
  }
}

export const navigateTo = new Navigation();
