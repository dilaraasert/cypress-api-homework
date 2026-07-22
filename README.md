# Cypress API Test Otomasyon Projesi

1. Projenin Amacı:
* Cypress ile API test otomasyonu hazırlamak.
* HTTP metodlarını (GET, POST, PUT, DELETE) uç noktalarda kullanmak.
* Fixture kullanarak dışarıdan test verilerini yönetmek.
* Özel doğrulamalar için Custom Command geliştirmek.
* İstekleri testlerden ayırarak Reusable (Tekrar kullanılabilir) API Client yapısı oluşturmak.

2. Kullanılan Teknolojiler:
* Node.js
* Cypress
* TypeScript
* Git
* Fixture
* Cypress Assertions
* Test Edilecek API:*JSONPlaceholder
* Base URL: `https://jsonplaceholder.typicode.com`

3. Kurulum Adımları:
Projeyi bilgisayarınızda çalıştırmak için aşağıdaki adımları sırasıyla terminal üzerinde uygulayabilirsiniz:
* 1. Projeyi bilgisayarınıza indirin (Klonlayın):
  git clone <repository-linki>
* 2. Proje dizinine gidin:
   cd cypress-api-homework
* 3. Gerekli bağımlılıkları yükleyin:
   npm install

4. Testlerin Çalıştırılması
* Arayüz üzerinden testleri adım adım görmek için terminale aşağıdaki komutu girin:
  npx cypress open

5. Senaryoların Açıklaması:
**Posts Modülü:**
* Senaryo 1: Tüm Postları Listeleme:** GET `/posts` isteği atılarak 200 başarılı durum kodu, dönen yanıtın bir array (dizi) olduğu, en az bir kayıt döndüğü ve ilk kaydın id alanına sahip olduğu doğrulanır.
* Senaryo 2: Belirli Bir Post Getirme:** GET `/posts/1` isteği ile dönen veride durum kodunun 200 olduğu, id alanının 1 olduğu, title alanının string ve userId alanının number olduğu doğrulanır.
* Senaryo 3: Yeni Post Oluşturma:** Fixture verisi okunarak POST `/posts` isteği atılır; 201 kodu doğrulanır ve dönen yanıt içerisindeki title ile userId alanlarının eşleştiği kontrol edilir.
* Senaryo 4: Post Güncelleme:** PUT `/posts/1` isteği gönderilir, 200 durum kodu ve güncellenen alanların (response içerisinde) başarılı şekilde döndüğü doğrulanır.
* Senaryo 5: Post Silme:** DELETE `/posts/1` isteği gönderilir, durum kodu doğrulanır ve response gövdesinin boş döndüğü teyit edilir.

**Users Modülü:**
* Senaryo 6: Kullanıcı Bilgisi Getirme:** GET `/users/1` isteği atılır; 200 durumu, name ile email alanlarının varlığı ve company objesinin bulunduğu doğrulanır.
* Senaryo 7: Kullanıcı Listesi:** GET `/users` isteği gönderilir; durum kodu doğrulanır, dönen kullanıcı sayısının 10 olduğu ve tüm kullanıcıların email alanına sahip olduğu teyit edilir.

**Comments Modülü:**
* Senaryo 8: Comment Listesi:** GET `/comments` isteği gönderilir; durum kodu, dönen cevabın array olduğu ve ilk kayıtta email alanının varlığı doğrulanır.