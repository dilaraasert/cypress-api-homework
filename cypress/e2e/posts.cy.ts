import PostsApi from '../api/PostsApi';

describe('Post (Gönderi) API Testleri', () => {

    it('Senaryo 1: Tüm postları başarıyla listelemeli (GET /posts)', () => {
        PostsApi.getPosts().then((response: any) => {
            // @ts-ignore
            cy.validateStatusCode(response, 200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.greaterThan(0);
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0]).to.have.property('title');
            expect(response.body[0]).to.have.property('body');
            expect(response.body[0]).to.have.property('userId');
        });
    });

    it('Senaryo 2: Belirli bir post başarıyla getirilmeli (GET /posts/1)', () => {
        PostsApi.getPost(1).then((response: any) => {
            // @ts-ignore
            cy.validateStatusCode(response, 200);
            expect(response.body.id).to.eq(1);
            expect(response.body.title).to.be.a('string');
            expect(response.body.userId).to.be.a('number');
        });
    });

    it('Senaryo 3: Yeni bir post başarıyla oluşturulmalı (POST /posts)', () => {
        cy.fixture('posts').then((yeniPostVerisi) => {
            PostsApi.createPost(yeniPostVerisi).then((response: any) => {
                // @ts-ignore
                cy.validateStatusCode(response, 201);
                expect(response.body).to.have.property('id');
                expect(response.body.title).to.eq(yeniPostVerisi.title);
                expect(response.body.userId).to.eq(yeniPostVerisi.userId);
            });
        });
    });

    it('Senaryo 4: Var olan bir post güncellenmeli (PUT /posts/1)', () => {
        const guncelPost = {
            title: 'Güncellenmiş Başlık',
            body: 'İçerik başarıyla değiştirildi.',
            userId: 1
        };

        PostsApi.updatePost(1, guncelPost).then((response: any) => {
            // @ts-ignore
            cy.validateStatusCode(response, 200);
            expect(response.body.title).to.eq(guncelPost.title);
        });
    });

    it('Senaryo 5: Bir post başarıyla silinmeli (DELETE /posts/1)', () => {
        PostsApi.deletePost(1).then((response: any) => {
            // @ts-ignore
            cy.validateStatusCode(response, 200);
            expect(response.body).to.be.empty;
        });
    });
});