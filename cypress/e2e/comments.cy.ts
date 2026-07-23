import CommentsApi from '../api/CommentsApi';

describe('Comments API Test Senaryoları', () => {

    beforeEach(() => {
        cy.fixture('comments').as('commentData');
    });

    it('Senaryo 8: Comment Listesi', function () {

        CommentsApi.getComments().then((response: any) => {

            // @ts-ignore
            cy.validateStatusCode(response, 200);

            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.greaterThan(0);
            expect(response.body[0]).to.have.property('email');
            expect(response.body[0].email).to.eq(this.commentData.firstCommentEmail);

        });
    });

});