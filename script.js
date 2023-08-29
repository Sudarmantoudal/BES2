function calculate() {
  var hargaBarang = parseInt(document.getElementById('harga-barang').value.replace(/[^\d]/g, ''));
  var uangMuka = parseInt(document.getElementById('uang-muka').value.replace(/[^\d]/g, ''));

  if (isNaN(uangMuka)) {
    uangMuka = 0;
    document.getElementById('uang-muka').value = "Rp 0";
  }

  if (uangMuka > hargaBarang) {
    document.getElementById('result').innerHTML = "Uang Muka tidak boleh melebihi Harga Barang.";
    return;
  }

  var tenor = parseInt(document.getElementById('tenor').value);

  if (isNaN(tenor)) {
    tenor = 0;
  }

  if (tenor > 24) {
    document.getElementById('result').innerHTML = "Tenor tidak boleh lebih dari 24 bulan.";
    return;
  }

  // Validasi harga barang
  if (hargaBarang == 0) {
    alert('Harga barang tidak boleh nol!'); // Menampilkan pesan kesalahan
    return; // Menghentikan perhitungan
  }

  var angsuranPokok = hargaBarang - uangMuka;
  var pokokBulanan = angsuranPokok / tenor;
  var margin;

  if (angsuranPokok >= 0 && angsuranPokok <= 2000000) {
    if (tenor === 12) {
      margin = 0.4;
    } else if (tenor === 24) {
      margin = 0.8;
    }
  } else if (angsuranPokok > 2000000 && angsuranPokok <= 5000000) {
    if (tenor === 12) {
      margin = 0.35;
    } else if (tenor === 24) {
      margin = 0.6;
    }
  } else if (angsuranPokok > 5000000 && angsuranPokok <= 10000000) {
    if (tenor === 12) {
      margin = 0.3;
    } else if (tenor === 24) {
      margin = 0.5;
    }
  } else if (angsuranPokok > 10000000 && angsuranPokok <= 20000000) {
    if (tenor === 12) {
      margin = 0.25;
    } else if (tenor === 24) {
      margin = 0.45;
    }
  } else if (angsuranPokok > 20000000) {
    margin = 0.2;
  }

  var marginBulanan = margin * angsuranPokok * tenor / 24;
  var angsuranBulanan = pokokBulanan + marginBulanan;
  var jumlahAngsuran = angsuranPokok + margin * angsuranPokok;

  document.getElementById('result').innerHTML = `
    <p>Angsuran Bulanan: ${formatCurrency(angsuranBulanan)}</p>
    <p>Jumlah Angsuran: ${formatCurrency(jumlahAngsuran)}</p>
  `;
}

// ... formatCurrency function remains the same
