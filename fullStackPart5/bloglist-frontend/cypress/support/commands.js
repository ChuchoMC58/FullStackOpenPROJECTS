// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('setupDbAndUser', () => {
	cy.request('POST', 'http://localhost:3003/api/testing')
		const user = {
			username: 'chucho',
			password: 'smth'
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
})

Cypress.Commands.add('addNewBlog', function( {title, author} ) {
	cy.contains('new note').click()
	cy.get('[data-cy="title"]').type(title)
	cy.get('[data-cy="author"]').type(author, {force: true})
	cy.contains('Save').click()
})

Cypress.Commands.add('createUser', function( {username, password} ) {
	const user = {
		username: username,
		password: password
	}
	cy.request('POST', 'http://localhost:3003/api/users', user)
} )