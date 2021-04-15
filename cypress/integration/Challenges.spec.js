const authUser = require('../fixtures/auth-user.json')
describe("As a user, I would like to add friends", () => {


    it("Should let me create new challenges", () => {

        

            const {login_email, login_password} = authUser
            const friendCode = 'OZEB';

            cy.visit('/signin')
            cy.get('#email').type(login_email)
            cy.get('#password').type(login_password)
            cy.contains('Sign In').click()
            cy.contains('Challenges').click()
            cy.get('#newChallenge > .MuiButtonBase-root > .MuiButton-label').click()



        
        
    })

    it("Should let me view my previous or completed challenges", () => {

        

        const {login_email, login_password} = authUser
        const friendCode = 'OZEB';

        cy.visit('/signin')
        cy.get('#email').type(login_email)
        cy.get('#password').type(login_password)
        cy.contains('Sign In').click()
        cy.contains('Challenges').click()
        cy.get(':nth-child(2) > .makeStyles-cardHeader-124 > .makeStyles-cardTitleWhite-164').click()



    
    
})


    
})
