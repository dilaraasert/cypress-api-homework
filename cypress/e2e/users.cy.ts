// 1. ADIM: İHTİYACIMIZ OLAN ARAÇLARI İÇERİ AKTARIYORUZ
// 'import' kelimesi dışarıdan bir dosyayı bu dosyaya getirmek için kullanılır.
// Burada, '../api/UsersApi' dosyasında yazdığımız kodları 'UsersApi' adıyla bu dosyaya çağırıyoruz ki istek atabilelim.
import UsersApi from '../api/UsersApi';

// 2. ADIM: TEST GRUBUMUZU OLUŞTURUYORUZ
// 'describe' bloğu, bir kitabın bölümü gibidir. Birbiriyle alakalı testleri bir çatı altında toplar.
// Buradaki ilk tırnak içi yazı, testimizin genel başlığıdır.
describe('Kullanıcı (Users) API Test Senaryoları', () => {

    // 3. ADIM: HER TESTTEN ÖNCE YAPILACAK HAZIRLIKLAR
    // 'beforeEach', adından da anlaşılacağı gibi bu gruptaki ('it' blokları) HER testten ÖNCE otomatik olarak çalışır.
    // Tıpkı yemeğe başlamadan önce masayı kurmak gibidir.
    beforeEach(() => {
        // 'cy.fixture' ile fixtures klasöründeki 'users.json' dosyasını bulup okuyoruz.
        // '.as' ile bu okuduğumuz veriye 'userTestData' adında bir takma isim (alias) veriyoruz ki aşağıda kolayca çağıralım.
        cy.fixture('users').as('userTestData');
    });

    // 4. ADIM: İLK TESTİMİZ (SENARYO 6)
    // 'it' bloğu bizim asıl test senaryomuzdur. İçine neyi test ettiğimizi açıklayan bir metin yazarız.
    it('Senaryo 6: Tüm kullanıcılar başarıyla listelenmeli', () => {

        // Yukarıda import ettiğimiz 'UsersApi' içindeki 'getUsers' metodunu çalıştırıyoruz. (Sunucuya tüm kullanıcıları ver diyoruz)
        // '.then((response) =>' kısmı şu demek: Sunucudan cevap gelene kadar bekle, cevap gelince o cevabı al ve 'response' (yanıt) kelimesinin içine koy.
        UsersApi.getUsers().then((response) => {

            // TypeScript'in bu özel komutumuzu tanımayıp hata vermemesi için onu bir satırlığına susturuyoruz.
            // @ts-ignore
            // Yazdığımız özel komutu kullanarak sunucudan dönen durum kodunun (status code) 200 (Yani Başarılı/OK) olup olmadığını kontrol ediyoruz.
            cy.validateStatusCode(response, 200);

            // 'expect' kelimesi iddia etmek, beklemek anlamına gelir.
            // Burada diyoruz ki: Gelen cevabın gövdesi (response.body) kesinlikle bir liste (array) tipinde olmalıdır!
            expect(response.body).to.be.an('array');

            // Burada da diyoruz ki: Bu listenin uzunluğu (eleman sayısı) kesinlikle 0'dan büyük olmalıdır! (Yani boş liste dönmemeli)
            expect(response.body.length).to.be.greaterThan(0);
        });
    });

    // 5. ADIM: İKİNCİ TESTİMİZ (SENARYO 7)
    // Dikkat: Burada '() =>' yerine eski usül 'function ()' yazdık. Çünkü içeride 'this' kelimesini kullanarak beforeEach'te kaydettiğimiz veriye ulaşacağız.
    it('Senaryo 7: ID ile tek bir kullanıcı başarıyla getirilmeli', function () {

        // beforeEach'te 'userTestData' adıyla sakladığımız JSON dosyasındaki verileri alıp, 'testData' adında kısa bir değişkene kopyalıyoruz.
        const testData = this.userTestData;

        // Sunucuya tek bir kullanıcı için istek atıyoruz. Ama ID'yi elle "1" yazmak yerine, JSON dosyamızdan (testData.targetUserId) dinamik olarak alıyoruz.
        UsersApi.getUserById(testData.targetUserId).then((response) => {

            // Yine TypeScript'i susturuyoruz.
            // @ts-ignore
            // Gelen cevabın durum kodunun 200 (Başarılı) olduğunu teyit ediyoruz.
            cy.validateStatusCode(response, 200);

            // DOĞRULAMA ADIMLARI (Assertions):
            // Gelen cevabın içindeki ID numarası, bizim JSON dosyasında gönderdiğimiz ID numarasına eşit (eq) mi?
            expect(response.body.id).to.eq(testData.targetUserId);

            // Gelen cevabın içindeki isim (name), bizim JSON dosyasında beklediğimiz (expectedName) isme eşit mi?
            expect(response.body.name).to.eq(testData.expectedName);

            // Gelen cevabın içindeki kullanıcı adı (username), bizim JSON'da beklediğimiz kullanıcı adına eşit mi?
            expect(response.body.username).to.eq(testData.expectedUsername);

            // Gelen cevabın içindeki e-posta adresi, bizim JSON'da beklediğimiz e-posta adresine eşit mi?
            expect(response.body.email).to.eq(testData.expectedEmail);
        });
    });

}); // Bu parantez, en baştaki 'describe' (ana test grubu) bloğunu kapatır. Test dosyamız burada biter.