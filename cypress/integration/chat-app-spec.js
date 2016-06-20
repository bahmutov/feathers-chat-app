describe('Chat app', function(){
  it('logs in and sees messages', function(){
    cy.visit(Cypress.config('baseUrl'))
    cy.title().should('include', 'Feathers Chat')
    cy.contains('Login').click()
    cy.url().should('include', 'login.html')
    cy.get('input[name="email"]').clear().type('a@a.com')
    cy.get('input[name="password"]').clear().type('a')
    cy.contains('Login').click()
    cy.url().should('include', 'chat.html')
    // there should be messages already
    cy.get('.message').should('have.length.gt', 0)

    // send a message
    const random = Math.round(Math.random() * 1e+6)
    const msg = `This is a test ${random}`
    cy.get('input[name="text"]').type(msg + '{enter}')

    // make sure the test message has appeared
    cy.contains('.message', msg).should('exist')
  })
})
