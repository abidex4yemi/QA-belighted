import { navigateTo, datePicker } from '.';

export class Training {
  addInformation({ title, description }) {
    navigateTo.createTrainingPage();

    cy.get('[placeholder="Add training  title"]').type(title);

    cy.typeDescription('training_description', description);

    cy.get('[data-purpose="open_cover_picker_button"]')
      .click()
      .get('.portal-root')
      .invoke('show', { force: true })
      .find('[data-purpose="training_covers_picker"] li')
      .eq(6)
      .click();

    cy.get('[data-purpose="category_input"]')
      .find('.react-select__dropdown-indicator')
      .then((dropdown) => {
        cy.wrap(dropdown).click();

        cy.get('.react-select__menu')
          .invoke('show')
          .find('.react-select__option')
          .eq(2)
          .click();
      });

    // datePicker.selectDay('Start date', 1);
    // datePicker.selectDay('End date', 20);
  }

  nextStep() {
    cy.get('main')
      .find('[data-purpose="next_step_button"]')
      .invoke('show')
      .click({ force: true });
  }

  searchModule(title) {
    cy.get('body')
      .find('.reveal')
      .invoke('show')
      .find('[data-purpose="protomodule_selector"]')
      .find('[placeholder="Start your search"]')
      .type(title);
  }

  selectModule() {
    cy.get('body')
      .find('.reveal')
      .invoke('show')
      .find('[data-purpose="protomodule_selector"]')
      .find('.search-result-list')
      .children()
      .first()
      .children()
      .eq(1)
      .invoke('show')
      .click({ force: true });

    cy.get('body')
      .find('.reveal')
      .invoke('show')
      .find('[data-purpose="protomodule_selector"]')
      .find('[data-purpose="validate_button"]')
      .click();
  }

  addModule(module, type) {
    cy.get(`[alt="${type}"]`).click();

    this.searchModule(module.title);
    this.selectModule();
  }

  publish() {
    cy.get('[data-purpose="publish_button"]').click();
    cy.contains('OK').click();
  }

  assertTrainingDetailsPage() {
    cy.get('[data-purpose="training_header"]').should('exist');
  }

  archiveTraining() {
    const stub = cy.stub();
    cy.on('window:confirm', stub);

    cy.get('.cards__item')
      .last()
      .find('[data-purpose="archive_button"]')
      .click();
  }

  deleteDraft() {
    cy.get('[data-purpose="delete_training_button"]').click();
    cy.contains('OK').click();
  }

  viewDetails() {
    cy.get('.cards__item').last().find('[data-purpose="show_link"]').click();
  }

  selectParticipantTab() {
    cy.get('.container')
      .find('#training')
      .find('.course--trainer')
      .find('[data-purpose="participants_tab_link"]')
      .click();
  }

  clickAddParticipantButton() {
    cy.get('.container')
      .find('#training')
      .find('.course--trainer')
      .find('[data-purpose="add_participant_button"]')
      .click();
  }

  searchTrainer(name) {
    cy.get('body')
      .find('.reveal')
      .invoke('show')
      .find('[data-purpose="user_selector"]')
      .find('[placeholder="Start your search"]')
      .type(name);
  }

  selectTrainer() {
    cy.get('body')
      .find('.reveal')
      .invoke('show')
      .find('[data-purpose="user_selector"]')
      .find('.search-result-list')
      .children()
      .first()
      .children()
      .eq(2)
      .invoke('show')
      .click({ force: true });

    cy.get('body')
      .find('.reveal')
      .invoke('show')
      .find('[data-purpose="user_selector"]')
      .find('[data-purpose="validate_button"]')
      .click();
  }

  addLearner(names) {
    this.selectParticipantTab();
    this.clickAddParticipantButton();

    // search functionality has a bug
    // it doesn't return trainer when inserted exact trainer name
    // the bug happens at random sometimes it works
    this.searchTrainer(names[0]);
    this.selectTrainer(names[0]);
  }
}

export const training = new Training();
