declare global {
    namespace Cypress {
        interface Chainable {
            validateStatusCode(response: any, expectedStatus: number): Chainable<void>;
        }
    }
}

Cypress.Commands.add('validateStatusCode', (response: any, expectedStatus: number) => {
    expect(response.status).to.eq(expectedStatus);
});