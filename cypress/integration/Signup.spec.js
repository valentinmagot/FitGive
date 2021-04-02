const authUser = require('../fixtures/auth-user.json')
describe("As a user, I would like to be able to register", () => {

    it("Should sign up to the system if all the input information is correct", () => {
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

    it("Should not sign up to the system if the input email is wrong", () => {

            const {signup_password, signup_firstname, signup_lastname} = authUser
            const wrong_email = 'effefefe';
            cy.visit('/signup')
            cy.get('#firstName').type(signup_firstname)
            cy.get('#lastName').type(signup_lastname)
            cy.get('#email').type(wrong_email)
            cy.get('#password').type(signup_password)
            cy.get('#password-confirm').type(signup_password)
            cy.contains('Sign Up').click()
            cy.contains('Failed to create an account')
            cy.on('uncaught:exception', (err) => {
                expect(err.message).to.include('The email address is badly formatted.')
                return false
              })


    })

    it("Should not sign up to the system if the input password is wrong", () => {

        
            const {signup_email,signup_password, signup_firstname, signup_lastname} = authUser
            const wrong_password = 'effefefe';
            cy.visit('/signup')
            cy.get('#firstName').type(signup_firstname)
            cy.get('#lastName').type(signup_lastname)
            cy.get('#email').type(signup_email)
            cy.get('#password').type(wrong_password)
            cy.get('#password-confirm').type(signup_password)
            cy.contains('Sign Up').click()
            cy.contains('Passwords do not match')


        

        
        
    })

    it("Should not sign up to the system if the input password confirmation is wrong", () => {

        
            const {signup_email,signup_password, signup_firstname, signup_lastname} = authUser
            const wrong_password = 'effefefe';
            cy.visit('/signup')
            cy.get('#firstName').type(signup_firstname)
            cy.get('#lastName').type(signup_lastname)
            cy.get('#email').type(signup_email)
            cy.get('#password').type(signup_password)
            cy.get('#password-confirm').type(wrong_password)
            cy.contains('Sign Up').click()
            cy.contains('Passwords do not match')


        
        
    })

    it("Should not sign up to the system if the input firstname is wrong", () => {

        
            const {signup_email,signup_password, signup_lastname} = authUser
            const wrong_firstname = "@#$";
            cy.visit('/signup')
            cy.get('#firstName').type(wrong_firstname)
            cy.get('#lastName').type(signup_lastname)
            cy.get('#email').type(signup_email)
            cy.get('#password').type(signup_password)
            cy.get('#password-confirm').type(signup_password)
            cy.contains('Sign Up').click()
            cy.contains('Failed to create an account')


        
    })

    it("Should not sign up to the system if the input format is wrong for lastname", () => {

        
            const {signup_email,signup_password, signup_firstname} = authUser
            const wrong_lastnmae = "@#$";
            cy.visit('/signup')
            cy.get('#firstName').type(signup_firstname)
            cy.get('#lastName').type(wrong_lastnmae)
            cy.get('#email').type(signup_email)
            cy.get('#password').type(signup_password)
            cy.get('#password-confirm').type(signup_password)
            cy.contains('Sign Up').click()
            cy.contains('Failed to create an account')


        
    })

    // DELETE CY2 IN THE DB TO RUN THIS TEST AGAIN
})
