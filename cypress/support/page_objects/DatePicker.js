import { getFutureDayAndMonth } from '../getFutureDayAndMonth';

export class DatePicker {
  selectDayFromCurrent(day) {
    const { futureMonth, futureDay, fullMonthDayYear } = getFutureDayAndMonth(
      day
    );

    cy.get('#CalendarMonth__caption')
      .find('strong')
      .invoke('text')
      .then((months) => {
        if (!months.includes(futureMonth)) {
          cy.get('.DayPickerNavigation__next').click();
          this.selectDayFromCurrent(day);
        } else {
          cy.get('.CalendarMonthGrid')
            .get('button')
            .contains(futureDay)
            .click({ force: true });
        }
      });

    return fullMonthDayYear;
  }

  selectDay(placeholder, day) {
    cy.get('.DateRangePickerInput')
      .find(`[placeholder="${placeholder}"]`)
      .then((input) => {
        cy.wrap(input).click();

        this.selectDayFromCurrent(day);
      });
  }
}

export const datePicker = new DatePicker();
