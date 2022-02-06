const Section2 = {
  literals: {
    MSG_ALERT_NETWORK: 'Abnormally long network call!',
    FILE_LOGO_NAME: 'javascript-logo.png'
  },

  elements: {
    lnkSection2: '#navbar [href="/section-2"]',
    btnNetwork: '[data-test=network-call-button]',
    btnNewTab: '[data-test=new-tab-button]',
    btnDownload: '[data-test=file-download-button]'
  },

  actions: {

    accessSection() {
      cy.visit('/')
      cy.get(Section2.elements.lnkSection2).click()
    },

    clickNetworkBtn() {
      cy.get(Section2.elements.btnNetwork).click()
    },

    checkNetworkResponseStructure(response) {
      cy.fixture('networkResponse').then(contract => {
        cy.checkResponseStructure(response, contract)
      })
    },

    checkNewTabButtonCanOpenNewTab() {
      cy.url().then($previousUrl => {
        cy.get(Section2.elements.btnNewTab).parent()
          .should('have.attr', 'target', '_blank')
          .invoke('removeAttr', 'target')
          .click().then(() => {
            cy.url().then($newUrl => {
              expect($newUrl).to.not.be.eq($previousUrl)
            })
          }).then(() => {
            // Only comes back if the test passed and as consequence the url changed
            // otherwise, if it fails and the url changed other tests will not be impacted
            this.accessSection()
          })
      })
    },

    checkDownloadButton() {
      cy.get(Section2.elements.btnDownload)
        .should('have.attr', 'download', 'true')
    },

    checkDownloadedFile(downloadResponse) {
      cy.fixture('/images/jsLogo.png')
        .should((imgCode) => {
          expect(imgCode).to.be.eq(downloadResponse.body)
        })
    }

  },
}

module.exports = { Section2 }
