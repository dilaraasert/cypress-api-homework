class CommentsApi {
    getComments() {
        return cy.request({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/comments',
            failOnStatusCode: false
        });
    }
}

export default new CommentsApi();