import CommentsApi from '../api/CommentsApi';

describe('Yorumlar (Comments) API Test Senaryoları', () => {

    beforeEach(() => {
        cy.fixture('comments').as('commentData');
    });

    it('Senaryo 8: Tüm yorumlar getirilmeli ve ilk kaydın e-posta adresi doğrulanmalı', function () {
        CommentsApi.getComments().then((response) => {

            // @ts-ignore
            cy.validateStatusCode(response, 200);

            expect(response.body, 'API yanıtı bir dizi (array) formatında olmalı').to.be.an('array');
            expect(response.body.length, 'Dönen yorum listesi boş olmamalı').to.be.greaterThan(0);

            const firstComment = response.body[0];

            expect(firstComment, 'İlk kayıt içerisinde email alanı (property) bulunmalı').to.have.property('email');
            expect(firstComment.email, 'İlk kaydın e-posta adresi fixture verisiyle eşleşmeli').to.eq(this.commentData.firstCommentEmail);

        });
    });

});