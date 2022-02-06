const Section1 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    ALERT_FORM_SUBMITED: 'Form submitted!',
    GENDER_LABELS: {
      Female: 'female'
    }
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    lnkSection1: '#navbar [href="/section-1"]',
    btnShowTable: '[data-test=table-toggle-button]',
    btnShowForm: '[data-test=form-toggle-button]',
    elForm: {
      main: '[data-test=signup-form]',
      field: {
        name: '[data-test=full-name-input]',
        age: '[data-test=age-input]',
        gender: '[data-test=gender-select]',
        nurseCheck: '[data-test=nurse-input]'
      },
      btnSubmit: '[data-test=submit-btn]'
    },
    elTable: { 
      main: '[data-test=user-table]',
      header: '[data-test=table-header]',
      col: {
        id: '[data-test=user-table] >>> :nth-child(1)',
        firstName: '[data-test=user-table] >>> :nth-child(2)',
        lastName: '[data-test=user-table] >>> :nth-child(3)',
        dateOfBirth: '[data-test=user-table] >>> :nth-child(4)',
        role: '[data-test=user-table] >>> :nth-child(5)'
      },
    },
  },

  /**
   * An action should be pretty self explanatory! It consists of all the method performing
   * a particular action from clicking a simple button to doing complex assertions.
   */
  actions: {
  
    accessSection(){
      cy.visit('/')
      cy.get(Section1.elements.lnkSection1).click()
    },

    checkTableIsNotVisible(){
      cy.get(Section1.elements.elTable.main).should('not.be.visible')
    },

    checkTableIsVisible(){
      cy.get(Section1.elements.elTable.main).should('be.visible')
    },

    clickTableButton(){
      cy.get(Section1.elements.btnShowTable).click()
    },

    checkTableColumnsQty(colQty){
      cy.get(Section1.elements.elTable.header).find('th').should('have.length', colQty)
    },

    checkTableMaxRows(maxRows){
      cy.get(Section1.elements.elTable.header).siblings().should('have.length', maxRows)
    },

    checkMinimumUsersQty(min){
      // I have used a shorter solution below, here I just wanted to show the usage of the
      // chain commands siblings() and within()
      let userCount = 0 
        cy.get(Section1.elements.elTable.header).siblings().within(() => {
          cy.get(`:nth-child(5)`).each($role => {
            if($role.text() == 'user') userCount += 1
          })
        }).then(() =>{
          expect(userCount).to.be.at.least(min)
        })
    },

    checkExactlyQtyPeopleOverAge(qty, age) {
      let overSixth = 0 
          cy.get(Section1.elements.elTable.col.dateOfBirth).each($birthDate => {
            if(this.getAge($birthDate.text()) >= age) overSixth += 1
          }).then(() =>{
          expect(overSixth).to.be.eq(qty)
        })
    },
    
    getAge(bDate) {
      let currentDate = new Date()
      let birthDate = new Date(bDate)
      return currentDate.getFullYear() - birthDate.getFullYear()
    },

    checkFormIsNotVisible() {
      cy.get(Section1.elements.elForm.main).should('not.be.visible')
    },

    checkFormIsVisible() {
      cy.get(Section1.elements.elForm.main).should('be.visible')
    },

    clickShowFormButton() {
      cy.get(Section1.elements.btnShowForm).click()
    },

    fillsName(name) {
      cy.fillField(Section1.elements.elForm.field.name, name)
    },

    fillsAge(age) {
      cy.fillField(Section1.elements.elForm.field.age, age)
    },

    checkNameFieldHasText(expectedName) {
      cy.checkFormFieldValue(Section1.elements.elForm.field.name, expectedName)
    },
    
    checkAgeFieldHasNumber(expectedAge) {
      cy.checkFormFieldValue(Section1.elements.elForm.field.age, expectedAge)
    },

    checkNameAgeFullfilement() {
      // I'm checking only after typing to avoid behaviors like field cleaning onBlur
      cy.fixture('fakePersona').then(persona => {
        this.fillsName(persona.name)
        this.fillsAge(persona.age)
        this.checkNameFieldHasText(persona.name)
        this.checkAgeFieldHasNumber(persona.age)
      })
    },

    checkGenderSelectedValue(gender) {
      cy.get(Section1.elements.elForm.field.gender).select(gender)
      cy.checkFormFieldValue(
        Section1.elements.elForm.field.gender, 
        Section1.literals.GENDER_LABELS[gender]
        )
    },

    tickAndCheckNurseBox() {
      // Since the checkbox does not have a value I'm assuming we want 
      // to assert its checked properly
      cy.get(Section1.elements.elForm.field.nurseCheck)
      .check()
      .should('be.checked')
    },

    checkFormSubmitBehaviour(message = '') {
      const stub = cy.stub()
      cy.on('window:alert', stub)

      cy.get(Section1.elements.elForm.btnSubmit)
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(message)
        })

    }

  },
}

module.exports = { Section1 }
