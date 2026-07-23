import UsersApi from '../api/UsersApi';

describe('Kullanıcı (Users) API Test Senaryoları', () => {

    beforeEach(() => {
        cy.fixture('users').as('userTestData');
    });

    it('Senaryo 6: Kullanıcı Bilgisi Getirme', function () {
        const testData = this.userTestData;

        UsersApi.getUserById(1).then((response) => {
            // @ts-ignore
            cy.validateStatusCode(response, 200);
            expect(response.body.name).to.eq(testData.expectedName);
            expect(response.body.email).to.eq(testData.expectedEmail);
            expect(response.body).to.have.property('company');
            expect(response.body.company).to.be.an('object');
        });
    });

    it('Senaryo 7: Kullanıcı Listesi', () => {
        UsersApi.getUsers().then((response) => {
            // @ts-ignore
            cy.validateStatusCode(response, 200);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.length(10);

            response.body.forEach((user: any) => {
                expect(user).to.have.property('email');
            });
        });
    });

});