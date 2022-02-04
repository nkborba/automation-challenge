/// <reference types="Cypress" />

const { Section1 } = require('../objects/section-1') 

context('Section 1', () => {

  before(() => {
    Section1.actions.accessSection()
  })

  describe('Problem 1: Tables', () => {
  
    it('It all starts with the Table not visible ', function () {
      Section1.actions.checkTableIsNotVisible()
    })

    context('After clicking to show the Table', () => {

      before(() => {
        /** Since clicking on the button to perform all other tests is a requisite
         *  we can save some time making this step a before all
         */
        Section1.actions.clickTableButton()
      })

      it('the table must be shown', () => {
        Section1.actions.checkTableIsVisible()
      })
      
      it('the table has 5 columns', () => {
        Section1.actions.checkTableColumnsQty(5)
      })

      it('the table is 10 rows long', () => {
        Section1.actions.checkTableMaxRows(10)
      })

      it('the table shows at least 5 personas with the role user', () =>{
        Section1.actions.checkMinimumUsersQty(5)
      })

      it('the table shows exactly 3 people older then 60y/o', () => {
        Section1.actions.checkExactlyQtyPeopleOverAge(3, 60)
      })
      
    })
    

  })

  describe('Problem 2: Forms', () => {

    it('It all starts with the Form not visible', () => {
      Section1.actions.checkFormIsNotVisible()
    })

    context('After clicking to show the Form', () => {

      before(() => {
        Section1.actions.clickShowFormButton()
      })

      it('the Form must be shown', () => {
        Section1.actions.checkFormIsVisible()
      })

      it('filling the fields Name and Age are working properly', () => {
        Section1.actions.checkNameAgeFullfilement()
      })

      it('selecting gender as Female define genders dropdown value accordingly', () => {
        Section1.actions.checkGenderSelectedValue('Female')
      })

      it('ticking the checkbox Nurse change its status to true', () => {
        Section1.actions.tickAndCheckNurseBox()
      })

      it(`clicking the Submit button trigger an alert with the text "${Section1.literals.ALERT_FORM_SUBMITED}"`, () => {
        Section1.actions.checkFormSubmitBehaviour(Section1.literals.ALERT_FORM_SUBMITED)
      })
    })

  })

})