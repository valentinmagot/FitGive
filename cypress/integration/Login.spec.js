const authUser = require('../fixtures/auth-user.json')
describe("As a user, I would like to have a login page, so that I can log into the system", () => {


    it("Should log in to the system", () => {
        const {login_email, login_password} = authUser

        cy.visit('/signin')
        cy.get('#email').type(login_email)
        cy.get('#password').type(login_password)
        cy.contains('Sign In').click()

        cy.get('.user-name', { timeout: 10000 }).contains('TEST').should('exist')
    })

    
})
