class UsersApi {
    getUsers() {
        return cy.request({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users',
            failOnStatusCode: false
        });
    }

    getUserById(id: number) {
        return cy.request({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/users/${id}`,
            failOnStatusCode: false
        });
    }
}

export default new UsersApi();