export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const midtransClient = require('midtrans-client');

            // Setup Midtrans client menggunakan environment variables
            let snap = new midtransClient.Snap({
                isProduction: false, // Ganti dengan true jika di production
                serverKey: process.env.SERVER_KEY,  // Ambil server key dari environment variables
                clientKey: process.env.CLIENT_KEY   // Ambil client key dari environment variables
            });

            // Ambil parameter dari request
            let parameter = {
                transaction_details: req.body.transaction_details,
                credit_card: {
                    secure: true
                }
            };

            // Buat transaksi dengan Midtrans
            const transaction = await snap.createTransaction(parameter);

            // Cek apakah token berhasil didapat
            if (transaction && transaction.token) {
                res.status(200).json({ token: transaction.token });
            } else {
                throw new Error('Token tidak tersedia dari Midtrans');
            }
        } catch (error) {
            console.error('Error creating transaction:', error);
            res.status(500).json({ error: 'Failed to create transaction token', details: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
