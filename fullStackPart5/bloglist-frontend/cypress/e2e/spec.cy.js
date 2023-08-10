import { slowCypressDown } from "cypress-slow-down"

slowCypressDown(100)

describe('BLog testing', function() {
	beforeEach(function(){
		cy.request('POST', 'http://localhost:3003/api/testing')
		const user = {
			username: 'chucho',
			password: 'smth'
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('localhost:3000')
	})

  it.skip('visits home page', function(){
		cy.contains('Login in to View BLogs')
  })

	describe('login', function(){
		beforeEach(function(){
			cy.get('[data-cy="username"]').type('chucho')
			cy.get('[data-cy="password"]').type('smth')
			cy.contains('login').click() 
			
		})

		it.only('blog with most likes is at the top', function() {
			cy.addNewBlog({title: 'skip', author: 'y'})
			cy.addNewBlog({title: 'any', author: 'me'})
			cy.addNewBlog({title: 'only', author: 'x'})
			
			cy.contains('only').parent().find('button').click()
			cy.contains('only').parent().find('.likeButton').as('likeOnly')
			cy.get('@likeOnly').click({multiple: true}).debug()
			cy.get('@likeOnly').click({multiple: true})

			cy.contains('skip').parent().find('button').click()
			cy.contains('skip').parent().find('.likeButton').as('likeSkip')
			cy.get('@likeSkip').click({multiple: true})
			
			cy.contains('any').parent().find('button').click()
			cy.contains('any').parent().find('.likeButton').as('likeAny')
			cy.get('@likeAny').click({multiple: true})
			cy.get('@likeAny').click({multiple: true})
			cy.get('@likeAny').click({multiple: true})

			cy.contains('Sort').click()
			cy.get('[data-cy="title"]').eq(1).should('contain', "any")
			cy.get('[data-cy="title"]').eq(2).should('contain', "only")

		});

		it.skip('user can create new blog', function() {
			cy.contains('new note').click()
			cy.get('[data-cy="title"]').type('testing')
			cy.get('[data-cy="author"]').type('cypress')
			cy.contains('Save').click()
			cy.contains('testing')
		});

		it('User can like a blog', function(){
			cy.addNewBlog({
				title: 'any',
				author: 'me'
			})
			cy.contains('show more').click()
			cy.contains('likes', { matchCase: false })
				.contains(0)

			cy.get('.likeButton').click()
			cy.contains('likes', { matchCase: false })
			.contains(1)
		});

		it('blog can be deleted', function() {
			cy.addNewBlog({
				title: 'any',
				author: 'me'
			})
			cy.contains('show more').click()
			cy.contains('Delete').click()
			cy.get('html').should('not.contain', 'any')
		});

		it.skip('blog cannot be deleted by another user', function() {
			cy.createUser({
				username: 'gio',
				password: "1234"
			})
			cy.addNewBlog({
				title: 'any',
				author: 'me'
			})
			cy.contains('show more').click()
			cy.contains('Delete').click()
			cy.get('html').should('not.contain', 'any')
		});

	})
})