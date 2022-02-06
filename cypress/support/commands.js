// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const path = require('path')

Cypress.Commands.add('fillField', (element, input) => {
    cy.get(element).type(input)
})

Cypress.Commands.add('checkFormFieldValue', (element, expectedContent) => {
    cy.get(element).should('have.value', expectedContent)
})

Cypress.Commands.add('checkAlertMessage', (stub, msg) => {
    expect(stub.getCall(0)).to.be.calledWith(msg)
})

Cypress.Commands.add('checkRequestStatus', (response, status) => {
    cy.wrap(response)
        .its('response.statusCode')
        .should('eq', status)
})

Cypress.Commands.add('checkResponseStructure', (response, structure) => {
    cy.wrap(response)
        .its('response.body').then($body => {
            expect($body).has.keys(structure)
        })
})

Cypress.Commands.add('checkLinkHealth', (link) => {
    cy.request(link).then($res => {
        expect($res.status).to.eq(200)
    })
})

/**
 * @param baseFile should be the path to the fixture file used as base of integrity
 * @param fileDownloaded is the name of the downloaded file
 */
Cypress.Commands.add('checkDownloadedFileIntegrity', (baseFile, fileDownload) => {
    let downloadedFilename, decomponsedFileBase64

    downloadedFilename = path.join(Cypress.config('downloadsFolder'), fileDownload)

    cy.fixture(baseFile,)
        .should((buffer) => {
            decomponsedFileBase64 = buffer
        })

    cy.readFile(downloadedFilename, 'base64', { timeout: 15000 })
        .should((buffer) => {
            expect(buffer).to.be.eq(decomponsedFileBase64)
        })
})

Cypress.Commands.add('getDownloadResponse', (element) => {
    cy.get(element)
      .and('have.attr', 'href')
      .then($href => {
        cy.request({url: $href, encoding: 'base64'})
      })
})


