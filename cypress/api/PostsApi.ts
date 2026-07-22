// 1. "PostsApi" adında bir kurye/servis sınıfı (class) oluşturuyoruz.
// Bu sınıf, Posts (Gönderi) API uç noktaları (endpoints) ile ilgili tüm HTTP isteklerini yönetir.
class PostsApi {

    // Senaryo 1: Tüm postları getiren (listeleyen) fonksiyon
    getPosts() {
        // cy.request Cypress'in HTTP isteklerini atan temel fonksiyonudur.
        // return diyerek gelen cevabı (response) çağrıldığı yere (test dosyasına) geri döndürüyoruz.
        return cy.request({
            method: 'GET', // Sunucudan veri okumak için GET metodunu kullanıyoruz.
            url: '/posts', // baseUrl üzerine eklenecek uç nokta (endpoint) adresi.
            failOnStatusCode: false // HTTP hata kodlarında (4xx/5xx) Cypress'in testi otomatik çökertmesini engeller, kontrolü bize bırakır.
        });
    }

    // Senaryo 2: Belirli bir id'ye sahip tek bir postu getiren fonksiyon
    getPost(id: number) { // Dışarıdan getirilecek postun benzersiz kimliğini (id) sayı olarak alır.
        return cy.request({
            method: 'GET', // Veri okuma işlemi olduğu için GET kullanıyoruz.
            url: `/posts/${id}`, // Template literal (ters tırnak) ile id parametresini URL'e dinamik olarak ekliyoruz.
            failOnStatusCode: false // Hata durumunda testin hemen çökmesini engeller.
        });
    }

    // Senaryo 3: Yeni bir post kaydı oluşturan fonksiyon
    createPost(body: object) { // Dışarıdan gönderilecek yeni post verilerini bir obje (object) olarak alır.
        return cy.request({
            method: 'POST', // Yeni bir kaynak (resource) oluşturmak için POST metodunu kullanıyoruz.
            url: '/posts', // Yeni kaydın gönderileceği uç nokta.
            body: body, // Gönderilecek yeni post verisini (başlık, içerik vb.) istek gövdesine (body) koyuyoruz.
            failOnStatusCode: false // Hata kodlarında kontrolün test dosyasında olmasını sağlar.
        });
    }

    // Senaryo 4: Var olan bir post kaydını güncelleyen fonksiyon
    updatePost(id: number, body: object) { // Güncellenecek kaydın id'sini ve yeni bilgileri (body) alır.
        return cy.request({
            method: 'PUT', // Var olan veriyi tamamen değiştirmek/güncellemek için PUT metodunu kullanıyoruz.
            url: `/posts/${id}`, // Güncellenecek spesifik kaynağın URL adresi.
            body: body, // Güncellenmiş verileri istek gövdesinde sunucuya taşıyoruz.
            failOnStatusCode: false // Kontrollü doğrulama yapabilmek için testi çökertmez.
        });
    }

    // Senaryo 5: Belirli bir id'ye sahip postu silen fonksiyon
    deletePost(id: number) { // Silinecek kaydın benzersiz kimliğini (id) alır.
        return cy.request({
            method: 'DELETE', // Kaydı silmek için DELETE HTTP metodunu kullanıyoruz.
            url: `/posts/${id}`, // Silinecek kaynağın adresini belirtiyoruz.
            failOnStatusCode: false // Hata kodunda testin yarıda kesilmesini engeller.
        });
    }
}

// Sınıfı "new PostsApi()" diyerek örneklendirilmiş (instantiated) bir nesne olarak dışa aktarıyoruz.
// Bu sayede test dosyasında sürekli "new" anahtar kelimesini kullanmadan doğrudan metotlara erişebiliriz.
export default new PostsApi();