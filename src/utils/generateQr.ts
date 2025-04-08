import QRCode from "qrcode";

export async function generateQr(url: string) {
  try {
    const qr = await QRCode.toDataURL(url);
    return qr;
  } catch (err) {
    console.error(err);
  }
}
