const authUser = require('../fixtures/auth-user.json')
describe(" As a user, I would like to have a sign up page, so that I can register to the system", () => {

    it("Should sign up to the system", () => {
        const {signup_email, signup_password, signup_firstname, signup_lastname} = authUser

        cy.visit('/signup')
        cy.get('#firstName').type(signup_firstname)
        cy.get('#lastName').type(signup_lastname)
        cy.get('#email').type(signup_email)
        cy.get('#password').type(signup_password)
        cy.get('#password-confirm').type(signup_password)
        cy.contains('Sign Up').click()

        cy.get('.user-name', { timeout: 10000 }).contains('CY').should('exist')
    })
})