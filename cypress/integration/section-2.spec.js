/// <reference types="Cypress" />

const { Section2 } = require('../objects/section-2')

context('Section 2', () => {

  before(() => {
    Section2.actions.accessSection()
  })

  describe('Problem 1: HTTP Waiting for network calls', () => {

    let stub

    before(() => {
      stub = cy.stub()
      cy.on('window:alert', stub)
      cy.intercept('/todos/1').as('longWait')
      Section2.actions.clickNetworkBtn()
    })

    describe('After clicking network button', () => {

      let response

      before(() => {
        cy.wait('@longWait').then(res => {
          response = res
        })
      })

      it('request status should be 200', () => {
        cy.checkRequestStatus(response, 200)
      })

      it('request response structure has id and title', () => {
        Section2.actions.checkNetworkResponseStructure(response)
      })

      it(`alert window message is ${Section2.literals.MSG_ALERT_NETWORK}`, () => {
        cy.checkAlertMessage(stub, Section2.literals.MSG_ALERT_NETWORK)
      })

    })

  })

  describe('Problem 2: Browser API: Opening a new tab', () => {

    it('Clicking New Tab button opens a new tab', () => {
      Section2.actions.checkNewTabButtonCanOpenNewTab()
    })

  })

  describe('Problem 3: Browser API: Downloading a file', () => {

    let downloadResponse

    before(() => {
      cy.getDownloadResponse(Section2.elements.btnDownload)
        .then($res => {
          downloadResponse = $res
        })
    })

    it('download button download the file properly on the same page', () => {
      Section2.actions.checkDownloadButton()
    })

    it('BONUS: downloaded file matchs the original file', () => {
      Section2.actions.checkDownloadedFile(downloadResponse)
    })

  })
})
