class PostsApi {

    getPosts() {
        return cy.request({
            method: 'GET',
            url: '/posts',
            failOnStatusCode: false
        });
    }

    getPost(id: number) {
        return cy.request({
            method: 'GET',
            url: `/posts/${id}`,
            failOnStatusCode: false
        });
    }

    createPost(body: object) {
        return cy.request({
            method: 'POST',
            url: '/posts',
            body: body,
            failOnStatusCode: false
        });
    }

    updatePost(id: number, body: object) {
        return cy.request({
            method: 'PUT',
            url: `/posts/${id}`,
            body: body,
            failOnStatusCode: false
        });
    }

    deletePost(id: number) {
        return cy.request({
            method: 'DELETE',
            url: `/posts/${id}`,
            failOnStatusCode: false
        });
    }
}

export default new PostsApi();