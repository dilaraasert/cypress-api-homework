class UsersApi {
    getUsers() {
        return cy.request({
            method: 'GET',
            url: '/users',
            failOnStatusCode: false
        });
    }

    getUserById(id: number) {
        return cy.request({
            method: 'GET',
            url: `/users/${id}`,
            failOnStatusCode: false
        });
    }
}

export default new UsersApi();