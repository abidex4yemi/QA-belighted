/// <reference types="cypress" />

import {
  navigateTo,
  auth,
  module,
  error,
  training,
  datePicker,
} from '../support/page_objects';

describe('Training [Test suite]', () => {
  beforeEach(() => {
    const email = Cypress.env('email');
    const password = Cypress.env('password');

    auth.login({ email, password });
    cy.assertDashboardDisplayed();
    auth.assertLoggedInUser();
  });

  it('user (type trainer) can create new training', () => {
    cy.fixture('modules').then((moduleJsonFile) => {
      const moduleDetails = {
        ...moduleJsonFile[1],
        title: 'Can add module to training',
      };

      module.createAndPublishModule(moduleDetails);

      cy.fixture('trainings').then((trainingJsonFile) => {
        training.addInformation(trainingJsonFile[0]);

        training.nextStep();

        training.addModule(moduleDetails, 'Learning');

        training.nextStep();

        training.publish();
      });

      training.assertTrainingDetailsPage();

      navigateTo.viewAllTrainingPage();

      training.archiveTraining();

      navigateTo.viewAllModulesPage();
      module.archiveModule(0, moduleDetails.title);
    });
  });

  it('user (type trainer) can not create new training without adding at least one module', () => {
    cy.fixture('modules').then((moduleJsonFile) => {
      const moduleDetails = {
        ...moduleJsonFile[1],
        title: 'Did not add module to training',
      };

      module.createAndPublishModule(moduleDetails);

      cy.fixture('trainings').then((trainingJsonFile) => {
        training.addInformation(trainingJsonFile[1]);

        training.nextStep();

        training.publish();

        const expectedErrorMessage =
          'Training Modules must be filled and Training Modules size cannot be less than 1';
        error.assertTrainingModuleMissing(expectedErrorMessage);
      });

      training.deleteDraft();

      navigateTo.viewAllModulesPage();
      module.archiveModule(0, moduleDetails.title);
    });
  });

  it('user (type trainer) can add learner to training', () => {
    cy.fixture('modules').then((moduleJsonFile) => {
      const moduleDetails = {
        ...moduleJsonFile[1],
        title: 'Can add module to training',
      };

      module.createAndPublishModule(moduleDetails);

      cy.fixture('trainings').then((trainingJsonFile) => {
        training.addInformation(trainingJsonFile[0]);

        training.nextStep();

        training.addModule(moduleDetails, 'Learning');

        training.nextStep();

        training.publish();
      });

      training.assertTrainingDetailsPage();

      training.addLearner(['Michael Albert', 'Michael Albert']);

      navigateTo.viewAllTrainingPage();

      training.archiveTraining();

      navigateTo.viewAllModulesPage();
      module.archiveModule(0, moduleDetails.title);
    });
  });
});
