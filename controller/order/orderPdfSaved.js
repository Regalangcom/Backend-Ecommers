const orderModel = require("../../models/orderModel");
const PDFDocument = require("pdfkit");
const { format } = require("date-fns");
const path = require("path");

const orderSavedPDF = async (req, res) => {
    try {
        const orderId = req.body.orderId;

        const order = await orderModel.findOne({ orderId });
        console.log(order);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const doc = new PDFDocument();

        // Mengambil bagian dari objek order untuk digunakan sebagai nama file
        const orderIdentifier = order._id.toString();

        // Set header respons untuk unduh PDF
        const filename = `receipt_${orderIdentifier}.pdf`;
        res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-type', 'application/pdf');

        // Pipe output dokumen ke respons HTTP
        doc.pipe(res);

        // Tambahkan gambar di atas kiri
        const logoPath = path.resolve(__dirname, '../../asset/logo_dana-removebg-preview.png'); // Update path sesuai lokasi file
        doc.image(logoPath, 50, 50, { width: 100 });

        // Tambahkan konten ke PDF
        doc.moveDown(3);
        doc.fontSize(25).fillColor('blue').text('Receipt', { align: 'center' });

        doc.moveDown();
        doc.fontSize(16);

        // Fungsi untuk menulis label dan nilai pada posisi yang sama
        const writeRow = (label, value) => {
            const labelX = 50; 
            const valueX = 250;
            const currentY = doc.y; 

            doc.fillColor('black').text(label, labelX, currentY);
            doc.fillColor('green').text(value, valueX, currentY);
            doc.moveDown();
        };

        // Menulis data ke PDF
        writeRow('Order ID:', order._id.toString());
        writeRow('Date:', format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm:ss'));
        writeRow('Email:', order.email);

        doc.fillColor('black').text('Product Details:', 50, doc.y);
        if (order.productDetails && Array.isArray(order.productDetails) && order.productDetails.length > 0) {
            doc.moveDown();
            order.productDetails.forEach(product => {
                writeRow('Name Product:', product.name);
                writeRow('Price Product:', `Rp ${product.price.toLocaleString('id-ID')}`);
                writeRow('QTY:', product.quantity.toString());
                doc.moveDown();
            });
        } else {
            writeRow('Product Details:', 'N/A');
        }

        writeRow('Total Amount:', `Rp ${order.totalAmount.toLocaleString('id-ID')}`);
        writeRow('Payment Status:', order.paymentDetails ? order.paymentDetails.payment_status : 'N/A');

        // Finalize dokumen PDF
        doc.end();
    } catch (error) {
        console.error('Error generating PDF', error);
        res.status(500).send('Error generating PDF');
    }
};

module.exports = orderSavedPDF;
