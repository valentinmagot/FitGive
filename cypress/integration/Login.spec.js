const authUser = require('../fixtures/auth-user.json')
describe("As a user, I would like to be able to login", () => {


    it("Should log in to the system if I enter correct information", () => {
        const {login_email, login_password} = authUser

        cy.visit('/signin')
        cy.get('#email').type(login_email)
        cy.get('#password').type(login_password)
        cy.contains('Sign In').click()

        cy.get('.user-name', { timeout: 10000 }).contains('CY').should('exist')
    })

    it("should log into the system if the info are correct: in this case we have wrong email", () => {

       
            const { login_password} = authUser
            const wrong_email = 'effefefe';

            cy.visit('/signin')
            cy.get('#email').type(wrong_email)
            cy.get('#password').type(login_password)
            cy.contains('Sign In').click()
            cy.contains('Failed to sign in.')
            cy.on('uncaught:exception', (err) => {
                expect(err.message).to.include('The email address is badly formatted.')
                
                return false
              })
            

    })

    it("Should log into the system if the info are correct: in this case we have wrong password", () => {

        
            const {login_email} = authUser
            const wrong_password = 'effefefe';

            cy.visit('/signin')
            cy.get('#email').type(login_email)
            cy.get('#password').type(wrong_password)
            cy.contains('Sign In').click()
            cy.contains('Failed to sign in.')
            

        




    })

    
})
