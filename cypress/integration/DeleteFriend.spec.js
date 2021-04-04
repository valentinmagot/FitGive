const authUser = require('../fixtures/auth-user.json')
describe("As a user, I would like the system to allow to remove friends", () => {


    it("Should let me remove friend", () => {

        

            const {login_email, login_password} = authUser

            cy.visit('/signin')
            cy.get('#email').type(login_email)
            cy.get('#password').type(login_password)
            cy.contains('Sign In').click()
            cy.contains('Friends').click()
            cy.get(':nth-child(1) > .MuiListItem-container > .MuiListItemSecondaryAction-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path',{ timeout: 10000 }).click()
            cy.get(':nth-child(1) > :nth-child(1) > .MuiPaper-root').contains("Friend removed")



        
        
    })

    
})
