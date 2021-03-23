const authUser = require('../fixtures/auth-user.json')
describe("As a user, I would like to visit all the page I am allowed to", () => {


    it("Should navigate to Challenges page", () => {

       

            const {login_email, login_password} = authUser

            cy.visit('/signin')
            cy.get('#email').type(login_email)
            cy.get('#password').type(login_password)
            cy.contains('Sign In').click()
            cy.contains('Challenges').click() 
            


    })

    it("Should navigate to Dashboard page", () => {

        

            const {login_email, login_password} = authUser

            cy.visit('/signin')
            cy.get('#email').type(login_email)
            cy.get('#password').type(login_password)
            cy.contains('Sign In').click()
            cy.contains('Dashboard').click()
            



        
    })

    it("Should navigate to Friends page", () => {

        

            const {login_email, login_password} = authUser

            cy.visit('/signin')
            cy.get('#email').type(login_email)
            cy.get('#password').type(login_password)
            cy.contains('Sign In').click()
            cy.contains('Friends').click()
            



        
        

    })

    
})
