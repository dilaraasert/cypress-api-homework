// 1. ADIM: SINIF (CLASS) OLUŞTURMA
// 'class' kelimesi bir şablon veya kalıp oluşturmak için kullanılır.
// Burada 'UsersApi' adında bir şablon oluşturuyoruz. Kullanıcılarla ilgili tüm API isteklerimizi bu şablonun içine koyacağız ki derli toplu dursun.
class UsersApi {

    // 2. ADIM: TÜM KULLANICILARI GETİRME METODU
    // 'getUsers', bizim kendi verdiğimiz bir isim. Bir eylem (metot/fonksiyon) tanımlıyoruz.
    // Amacı sunucuya gidip tüm kullanıcıların listesini alıp gelmek.
    getUsers() {

        // 'return', bu işlemin sonucunu işlemi çağıran yere (yani test dosyamıza) geri gönder demek.
        // 'cy.request', Cypress'in kuryesidir. Sunucuya HTTP istekleri (ağ istekleri) atmamızı sağlar.
        return cy.request({

            // 'method': Sunucudan sadece bilgi/veri çekeceğimiz (okuyacağımız) için 'GET' (Getir) yöntemini kullanıyoruz.
            method: 'GET',

            // 'url': Kuryemizin (cy.request) gideceği tam web adresi. Tüm kullanıcıların bulunduğu servisin adresi.
            url: 'https://jsonplaceholder.typicode.com/users',

            // 'failOnStatusCode': Eğer sunucu hata verirse (örneğin 404 Bulunamadı veya 500 Sunucu Hatası),
            // Cypress normalde testi anında iptal edip çökertir. 'false' diyerek diyoruz ki:
            // "Hata gelse bile sen çökme, cevabı bana getir, ben testin içinde o hatayı kendim kontrol edeceğim."
            failOnStatusCode: false

        }); // cy.request objesinin (süslü parantezlerin) kapanışı.
    } // getUsers metodunun kapanışı.

    // 3. ADIM: SADECE BELİRLİ BİR KULLANICIYI GETİRME METODU
    // 'getUserById' adında yeni bir metot tanımlıyoruz.
    // Parantez içindeki '(id: number)' şu demek: Bu metot çalışmak için dışarıdan bir 'id' numarası bekliyor.
    // TypeScript'e 'Bu id kesinlikle bir sayı (number) olmalı!' diyerek kural koyuyoruz.
    getUserById(id: number) {

        // Yine kuryemizi (cy.request) çağırıp, sonucunu geri döndürüyoruz (return).
        return cy.request({

            // Sadece bir kişiyi okuyacağımız için yine 'GET' metodunu kullanıyoruz.
            method: 'GET',

            // DİKKAT: Burada tek tırnak (') değil, backtick (`) yani ters tırnak kullanıyoruz (Genelde Alt Gr + Virgül ile yapılır).
            // Neden? Çünkü URL'in sonuna dışarıdan gelen o dinamik 'id' değerini (${id} şeklinde) eklemek istiyoruz.
            // Örneğin id olarak 5 gönderirsek, adres otomatik olarak '.../users/5' olacak.
            url: `https://jsonplaceholder.typicode.com/users/${id}`,

            // Yine olası bir sunucu hatasında testin anında çökmemesi için bu ayarı kapalı tutuyoruz.
            failOnStatusCode: false

        }); // cy.request objesinin (süslü parantezlerin) kapanışı.
    } // getUserById metodunun kapanışı.

} // UsersApi sınıfının (class) genel kapanışı.

// 4. ADIM: DIŞA AKTARMA (EXPORT)
// Biz yukarıda sadece bir şablon (class) oluşturduk.
// 'export default' kelimeleriyle bu dosyayı diğer dosyaların (örneğin test dosyalarının) kullanımına açıyoruz.
// 'new UsersApi()' diyerek bu şablondan taptaze, kullanılmaya hazır bir kopya (nesne/instance) yaratıp öyle gönderiyoruz.
// Böylece test dosyasında 'UsersApi.getUsers()' diyerek doğrudan kullanabiliyoruz!
export default new UsersApi();