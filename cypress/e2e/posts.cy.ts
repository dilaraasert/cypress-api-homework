// API isteklerini atan ve Page Object Model (POM) yapısını sağlayan kurye sınıfımızı içe aktarıyoruz.
import PostsApi from '../api/PostsApi';

// 'describe' bloğu, Posts API ile ilgili tüm test senaryolarını tek bir çatı altında toplayan ana gruptur.
describe('Post (Gönderi) API Testleri', () => {

    // ------------------------------------------------------------------
    // Senaryo 1: Tüm Postları Listeleme
    // ------------------------------------------------------------------
    it('Senaryo 1: Tüm postları başarıyla listelemeli (GET /posts)', () => {
        // Kuryemiz aracılığıyla tüm postları getiren API isteğini tetikliyoruz.
        PostsApi.getPosts().then((response: any) => {

            // Custom command olan validateStatusCode'un TypeScript tip denetimine takılmaması için derleyiciyi bu satırlık susturuyoruz.
            // @ts-ignore
            // Özel komutumuz ile dönen cevabın HTTP durum kodunun 200 (OK - Başarılı) olduğunu doğruluyoruz.
            cy.validateStatusCode(response, 200);

            // Cevap gövdesinin (response body) bir dizi/liste (array) formatında geldiğini teyit ediyoruz.
            expect(response.body).to.be.an('array');

            // Gelen listenin boş olmadığını, içerisinde en az 1 eleman bulunduğunu doğruluyoruz.
            expect(response.body.length).to.be.greaterThan(0);

            // Dönen dizinin ilk elemanında (0. indeks) olması gereken zorunlu alanların (properties) varlığını kontrol ediyoruz.
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0]).to.have.property('title');
            expect(response.body[0]).to.have.property('body');
            expect(response.body[0]).to.have.property('userId');
        });
    });

    // ------------------------------------------------------------------
    // Senaryo 2: Belirli Bir Post Getirme
    // ------------------------------------------------------------------
    it('Senaryo 2: Belirli bir post başarıyla getirilmeli (GET /posts/1)', () => {
        // Kuryemize 1 numaralı postu getirmesi talimatını veriyoruz.
        PostsApi.getPost(1).then((response: any) => {

            // @ts-ignore satırı ile TypeScript tip uyarısını devre dışı bırakıyoruz.
            // @ts-ignore
            // Durum kodunun 200 (Başarılı) olduğunu doğruluyoruz.
            cy.validateStatusCode(response, 200);

            // Gelen postun id değerinin gönderdiğimiz 1 değeri ile tam eşleştiğini kontrol ediyoruz.
            expect(response.body.id).to.eq(1);

            // Title (başlık) verisinin metin (string) türünde olduğunu doğruluyoruz.
            expect(response.body.title).to.be.a('string');

            // UserId verisinin sayı (number) türünde olduğunu teyit ediyoruz.
            expect(response.body.userId).to.be.a('number');
        });
    });

    // ------------------------------------------------------------------
    // Senaryo 3: Yeni Post Oluşturma
    // ------------------------------------------------------------------
    it('Senaryo 3: Yeni bir post başarıyla oluşturulmalı (POST /posts)', () => {
        // Test verimizi dışarıdan yönetmek için 'fixtures/posts.json' dosyasından veriyi okuyoruz.
        cy.fixture('posts').then((yeniPostVerisi) => {

            // Fixture'dan gelen veriyi kuryemize verip sunucuda yeni post oluşturma isteği atıyoruz.
            PostsApi.createPost(yeniPostVerisi).then((response: any) => {

                // @ts-ignore ile özel komut satırını tip denetiminden muaf tutuyoruz.
                // @ts-ignore
                // Yeni kayıt oluşturulduğu için sunucudan dönen durum kodunun 201 (Created) olduğunu doğruluyoruz.
                cy.validateStatusCode(response, 201);

                // Sunucunun yeni oluşturulan kayda otomatik bir 'id' atadığını doğruluyoruz.
                expect(response.body).to.have.property('id');

                // Dönen başlıktaki verinin giden fixture verisiyle birebir aynı olduğunu kontrol ediyoruz.
                expect(response.body.title).to.eq(yeniPostVerisi.title);

                // Dönen userId bilgisinin giden fixture verisiyle eşleştiğini teyit ediyoruz.
                expect(response.body.userId).to.eq(yeniPostVerisi.userId);
            });
        });
    });

    // ------------------------------------------------------------------
    // Senaryo 4: Post Güncelleme
    // ------------------------------------------------------------------
    it('Senaryo 4: Var olan bir post güncellenmeli (PUT /posts/1)', () => {
        // Güncelleme işleminde sunucuya gönderilecek yeni verileri içeren nesne.
        const guncelPost = {
            title: 'Güncellenmiş Başlık',
            body: 'İçerik başarıyla değiştirildi.',
            userId: 1
        };

        // Kuryemize 1 id'li postu bu yeni verilerle güncellemesi komutunu veriyoruz.
        PostsApi.updatePost(1, guncelPost).then((response: any) => {

            // @ts-ignore satırı ile TypeScript uyarısını bastırıyoruz.
            // @ts-ignore
            // Güncelleme başarılı olduğu için HTTP durum kodunun 200 olduğunu doğruluyoruz.
            cy.validateStatusCode(response, 200);

            // Sunucudan dönen başlık değerinin bizim gönderdiğimiz yeni başlıkla aynı olduğunu teyit ediyoruz.
            expect(response.body.title).to.eq(guncelPost.title);
        });
    });

    // ------------------------------------------------------------------
    // Senaryo 5: Post Silme
    // ------------------------------------------------------------------
    it('Senaryo 5: Bir post başarıyla silinmeli (DELETE /posts/1)', () => {
        // Kuryemiz vasıtasıyla 1 numaralı post için silme isteği atıyoruz.
        PostsApi.deletePost(1).then((response: any) => {

            // @ts-ignore
            // Silme işleminin başarıyla işlendiğini doğrulamak için HTTP durum kodunun 200 olduğunu kontrol ediyoruz.
            cy.validateStatusCode(response, 200);

            // Silme sonrasında cevabın gövdesinin (body) boş olduğunu doğruluyoruz.
            expect(response.body).to.be.empty;
        });
    });
});