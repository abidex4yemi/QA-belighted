/// <reference types="cypress" />

import { navigateTo, auth, module, error } from '../support/page_objects';

describe('Module [Test suite]', () => {
  beforeEach(() => {
    // cy.server()
    //   .route({ method: 'POST', url: '/en/api/graphql' })
    //   .as('graphQlPostRequest');

    const email = Cypress.env('email');
    const password = Cypress.env('password');

    auth.login({ email, password });
    cy.assertDashboardDisplayed();
    auth.assertLoggedInUser();
  });

  it('user (type trainer) can create and publish module', () => {
    cy.fixture('modules').then((moduleJsonFile) => {
      module.createAndPublishModule(moduleJsonFile[0]);

      module.assertModuleHasBeenPublished(moduleJsonFile[0].title);

      module.archiveModule(0, moduleJsonFile[0].title);
    });
  });

  it('user (type trainer) can not create new module if title and duration not provided', () => {
    module.createAndPublishModule({
      title: '     ',
      description: '     ',
      duration: 0,
    });

    const expectedErrorMessage =
      'Estimated Minutes must be filled and Estimated Minutes must be greater than or equal to 0';
    error.assertMissingModuleFormRequiredField(expectedErrorMessage);

    cy.get('[data-purpose="delete_button"]').click();
    cy.get('.swal2-confirm').click();
  });

  it('user type (trainer) can add steps to existing module', () => {
    cy.fixture('modules').then((moduleJsonFile) => {
      const moduleDetails = {
        ...moduleJsonFile[0],
        title: 'can add steps to module',
      };

      module.createAndPublishModule(moduleDetails);

      module.assertModuleHasBeenPublished(moduleDetails.title);

      module.updateModule(moduleDetails);

      module.archiveModule(0, moduleDetails.title);
    });
  });

  it('user type (trainer) can archive module', () => {
    cy.fixture('modules').then((moduleJsonFile) => {
      const moduleDetails = {
        ...moduleJsonFile[0],
        title: 'can archive module',
      };

      module.createAndPublishModule(moduleDetails);

      module.assertModuleHasBeenPublished(moduleDetails.title);

      module.archiveModule(0, moduleDetails.title);
    });
  });

  it('user type (trainer) can delete existing (draft) module', () => {
    module.createAndPublishModule({
      title: 'test delete',
      description: '     ',
      duration: 0,
    });

    navigateTo.viewAllModulesPage();

    cy.get('[data-purpose="edit_link"]')
      .eq(0)
      .click()
      .then(() => {
        cy.get('[data-purpose="delete_button"]').click();
        cy.get('.swal2-confirm').click();

        cy.contains('test delete').should('not.exist');
      });
  });
});
