import UsersApi from '../api/UsersApi';

describe('Kullanıcı API Test Senaryoları', () => {

    beforeEach(() => {
        cy.fixture('users').as('userTestData');
    });

    it('Senaryo 6 Tüm kullanıcılar başarıyla listelenmeli', () => {
        UsersApi.getUsers().then((response) => {
            // @ts-ignore
            cy.validateStatusCode(response, 200);

            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.greaterThan(0);
        });
    });

    it('Senaryo 7 ID ile tek bir kullanıcı başarıyla getirilmeli', function () {
        const testData = this.userTestData;

        UsersApi.getUserById(testData.targetUserId).then((response) => {
            // @ts-ignore
            cy.validateStatusCode(response, 200);

            expect(response.body.id).to.eq(testData.targetUserId);
            expect(response.body.name).to.eq(testData.expectedName);
            expect(response.body.username).to.eq(testData.expectedUsername);
            expect(response.body.email).to.eq(testData.expectedEmail);
        });
    });

});