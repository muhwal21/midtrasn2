document.getElementById('pay-button').onclick = function() {
    let orderId = 'ORDER-' + new Date().getTime();  // Menghasilkan ID order unik
    
    fetch('/api/payment-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            transaction_details: {
                order_id: orderId,   // Menggunakan ID order unik
                gross_amount: 100000  // Harga produk
            }
        })
    })
    .then(response => response.json())  // Ubah kembali ke response.json() karena kita mengharapkan JSON
    .then(data => {
        console.log('Response data:', data);  // Log untuk melihat isi respons dari server
        
        // Cek apakah token ada di data yang dikembalikan
        if (data.token) {
            snap.pay(data.token);  // Panggil Snap dengan token
        } else {
            console.error('Token tidak ditemukan dalam respons:', data);
        }
    })
    .catch(error => {
        console.error('Error:', error);  // Tampilkan error jika ada masalah fetch
    });
};
