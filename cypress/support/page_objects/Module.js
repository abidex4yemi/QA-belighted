import { navigateTo } from '.';

export class Module {
  createAndPublishModule({ title, duration }) {
    const stub = cy.stub();
    cy.on('window:confirm', stub);

    navigateTo.createModulePage();

    cy.get('[data-purpose="choose_learning_protomodule_link"]').click();
    cy.get('[data-purpose="title_input"]').invoke('show').type(title);

    cy.get('input[type=range]')
      .as('range')
      .eq(0)
      .then((input) => {
        cy.controlledInputChange(input, duration);
      })
      .get('@range')
      .siblings('p')
      .should('have.text', `${duration} minutes`);

    cy.get('#title').should('have.value', title);

    cy.get('[data-purpose="publish_button"]').click();
    cy.contains('OK').click();
  }

  createDraftModule({ title, duration }) {
    navigateTo.createModulePage();

    cy.get('[data-purpose="choose_learning_protomodule_link"]').click();
    cy.get('[data-purpose="title_input"]').invoke('show').type(title);

    cy.get('input[type=range]')
      .as('range')
      .eq(0)
      .then((input) => {
        cy.controlledInputChange(input, duration);
      })
      .get('@range')
      .siblings('p')
      .should('have.text', `${duration} minutes`);

    cy.get('#title').should('have.value', title);

    navigateTo.viewAllModulesPage();

    cy.get('[data-purpose="edit_link"]').eq(0).should('exist');
  }

  addStepOne({ title, description, imageName }) {
    // add step make a new POST request before the card become active
    // need to stub or wait?
    // Todo: refactor wait to mock and stub, spy
    cy.get('.module-step__add-list li').first().click({ force: true });

    cy.get('[placeholder="Write here the card title"]')
      .invoke('show')
      .type(title);

    cy.get('[data-purpose="file_input"]')
      .attachFile(imageName)
      .then(() => {
        cy.get('.portal-root')
          .invoke('show', { force: true })
          .findByText(/Vous pouvez déplacer/i)
          .parent()
          .get('[data-purpose="save_file_button"]')
          .click();
      });

    cy.typeDescription('assessment_protomodule_description', description);
  }

  addStepTwo({ title, url }) {
    cy.get('li').contains('External Content').click();

    cy.findAllByPlaceholderText('Title of your external content')
      .click({ force: true })
      .type(title);
    cy.get('[for="external_step_embed_or_url_url"]').click();
    cy.get('[data-purpose="url_input"]').type(url);
  }

  updateModule({ title, stepOneData, stepTwoData }) {
    cy.get('.dashboard__courses li')
      .contains(title)
      .parent()
      .parent()
      .children()
      .find('[data-purpose="edit_link"]')
      .click()
      .then(() => {
        module.addStepOne(stepOneData);
        module.addStepTwo(stepTwoData);
      });
  }

  archiveModule(index, title) {
    cy.get('[data-purpose="edit_link"]')
      .eq(index)
      .click()
      .then(() => {
        cy.get('[data-purpose="archive_button"]').click();
        cy.get('.swal2-confirm').click();

        const stub = cy.stub();
        cy.on('window:confirm', stub);

        cy.contains(title).should('not.exist');
      });
  }

  assertModuleHasBeenPublished(title) {
    cy.url().should('eq', `${Cypress.config().baseUrl}/en/trainer/my_modules`);
    cy.get('.dashboard__courses').first().contains(title).should('exist');
  }
}

export const module = new Module();
