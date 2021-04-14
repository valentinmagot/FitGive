const authUser = require('../fixtures/auth-user.json')
describe("As a user, I would like to add friends", () => {


    it("Should add friends if all the information is correct", () => {

        

            const {login_email, login_password} = authUser
            const friendCode = 'OZEB';

            cy.visit('/signin')
            cy.get('#email').type(login_email)
            cy.get('#password').type(login_password)
            cy.contains('Sign In').click()
            cy.contains('Friends').click()
            cy.get('#friend-input').type(friendCode)
             cy.get('form > :nth-child(2) > .MuiButtonBase-root > .MuiButton-label').click()
            cy.get(':nth-child(1) > :nth-child(1) > .MuiPaper-root').contains("Friend added")



        
        
    })

    it("Should not add a friends if that friend has been already added", () => {

        

        const {login_email, login_password} = authUser
        const friendCode = 'OZEB';

        cy.visit('/signin')
        cy.get('#email').type(login_email)
        cy.get('#password').type(login_password)
        cy.contains('Sign In').click()
        cy.contains('Friends').click()
        cy.get('#friend-input').type(friendCode)
         cy.get('form > :nth-child(2) > .MuiButtonBase-root > .MuiButton-label').click()
        cy.get(':nth-child(1) > :nth-child(1) > .MuiPaper-root').contains("User is already in friend list")



    
    
})

    it("Should not add friends if the user is not in the system", () => {

        

            const {login_email, login_password} = authUser
            const wrongfriendcode = '8xmA';

            cy.visit('/signin')
            cy.get('#email').type(login_email)
            cy.get('#password').type(login_password)
            cy.contains('Sign In').click()
            cy.contains('Friends').click()
            cy.get('#friend-input').type(wrongfriendcode)
            cy.get('form > :nth-child(2) > .MuiButtonBase-root > .MuiButton-label').click()
            cy.get(':nth-child(1) > :nth-child(1) > .MuiPaper-root').contains("User is not in the system")
            



        
        

    })

    it("Should not add friends if the user tries to add himself as a friend", () => {

        

        const {login_email, login_password} = authUser
        const wrongfriendcode = '8xmA';
        const selfcode='9jmm';

        cy.visit('/signin')
        cy.get('#email').type(login_email)
        cy.get('#password').type(login_password)
        cy.contains('Sign In').click()
        cy.contains('Friends').click()
        cy.get('#friend-input').type(selfcode)
        cy.get('form > :nth-child(2) > .MuiButtonBase-root > .MuiButton-label').click()
        cy.get(':nth-child(1) > :nth-child(1) > .MuiPaper-root').contains("Connot add yourself as friend")
        



    
    

})

    
})
