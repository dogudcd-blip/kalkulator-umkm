function ceilDiv(a, b) { return Math.floor((a + b - 1) / b); }
function hitung(i) {
  if (i.feeBp >= 10000 || i.diskonBp >= 10000 || i.feeBp < 0 || i.diskonBp < 0) throw new Error("Fee/diskon harus di bawah 100%");
  const bulat = i.bulat || 1;
  const biaya = i.modal + i.kemas + i.ongkir;
  const akhir = h => h - Math.floor(h * i.diskonBp / 10000);
  const fee = p => ceilDiv(p * i.feeBp, 10000) + i.tetap;
  const untung = h => { const p = akhir(h); return p - fee(p) - biaya; };
  const p0 = ceilDiv((biaya + i.tetap + i.target) * 10000, 10000 - i.feeBp);
  let h = ceilDiv(ceilDiv(p0 * 10000, 10000 - i.diskonBp), bulat) * bulat;
  while (untung(h) < i.target) h += bulat;
  while (h - bulat > 0 && untung(h - bulat) >= i.target) h -= bulat;
  const p = akhir(h);
  return { harga: h, hargaAkhir: p, fee: fee(p), untung: untung(h), marginBp: p > 0 ? Math.floor(untung(h) * 10000 / p) : 0 };
}
if (typeof module !== "undefined") module.exports = { hitung };
