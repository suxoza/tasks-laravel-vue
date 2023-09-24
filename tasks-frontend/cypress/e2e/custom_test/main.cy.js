
const route = 'http://localhost:5173'
const user_name = 'test_user'
const user_email = `test_user_email${Math.random().toString(36).substring(7)}@email.com`
const password = 'testPassword'

const login_action = () => {
  cy.visit(`${route}/login`) 
  cy.get('input[name="email"]').type(user_email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
}

describe('Authentication', () => {
    it('should allow user registration', () => {
      cy.visit(`${route}/register`) 
      cy.get('input[name="name"]').type(user_name)
      cy.get('input[name="email"]').type(user_email) 
      cy.get('input[name="password"]').type(password)
      cy.get('button[type="submit"]').click()      
    })
    
    it('should allow user logout', () => {
      cy.visit(`${route}/logout`) 
    })
    
    it('should allow user login', () => {
      login_action()
    })

    it('should allow user to create task', () => {
      login_action()
      cy.wait(3000)
      cy.visit(`${route}/tasks/create`) 
      cy.get('input[name="title"]').type('test title 1')
      cy.get('textarea[name="description"]').type('test description 222') 
      cy.get('input.dp__input:last').type('09/30/2023, 18:46', { force: true })
      cy.wait(1000)
      cy.get('div.dp__cell_inner.dp__pointer:last').click()
      cy.wait(1000)
      cy.get('button.dp__action_button.dp__action_select').click()
      cy.get('button[type="submit"]').click()      
    })
  })
  