class CommentsApi {

    getComments() {
        return cy.request({
            method: 'GET',
            url: '/comments',
            failOnStatusCode: false
        });
    }

}

export default new CommentsApi();