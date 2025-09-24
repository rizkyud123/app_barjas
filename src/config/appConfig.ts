import { AppConfig } from '../types';

export const appConfig: AppConfig = {
  "app_name": "Rekap Barang dan Jasa Dinas Pertanian Lombok Barat",
  "roles": {
    "admin": {
      "description": "Admin dapat mengakses semua file, mengelola pengguna, mengelola link spreadsheet, serta mengedit halaman aplikasi.",
      "access": [
        "barang_jasa",
        "perubahan",
        "psp",
        "tph",
        "nak",
        "bun",
        "analisa"
      ]
    },
    "user": {
      "description": "User hanya bisa mengakses BUN, TPH, PSP, NAK, dan Analisa.",
      "access": [
        "bun",
        "tph",
        "psp",
        "nak",
        "analisa"
      ]
    }
  },
  "spreadsheets": {
    "barang_jasa": {
      "name": "Barang dan Jasa",
      "url": "https://docs.google.com/spreadsheets/d/1KQ-yiIRVO1ry5LrPxGLuHxVwI8Lf8w7d_-nZolL3caM/edit?usp=drive_link",
      "embed": true,
      "download": true
    },
    "perubahan": {
      "name": "Perubahan",
      "url": "https://docs.google.com/spreadsheets/d/1mNUWRZsff0sl9ZktRQFxYqEcIzzsqcNI/edit?usp=drive_link",
      "embed": true,
      "download": true
    },
    "psp": {
      "name": "PSP",
      "url": "https://docs.google.com/spreadsheets/d/1Fqn_g6FSy1Em3Lz90esuQLAetA0TQfhS/edit?usp=drive_link",
      "embed": true,
      "download": true
    },
    "tph": {
      "name": "TPH",
      "url": "https://docs.google.com/spreadsheets/d/1l7nKhV7LDzvETPOOdRMK25i5whVf5iUb/edit?usp=drive_link",
      "embed": true,
      "download": true
    },
    "nak": {
      "name": "NAK",
      "url": "https://docs.google.com/spreadsheets/d/19F-VlNJcGGDctCfG7Fg0jpN7bYcjunGX/edit?usp=drive_link",
      "embed": true,
      "download": true
    },
    "bun": {
      "name": "BUN",
      "url": "https://docs.google.com/spreadsheets/d/1ujyWx5hKlhpVH-_8_89whG9wgy2KVT6h/edit?usp=drive_link",
      "embed": true,
      "download": true
    },
    "analisa": {
      "name": "Analisa",
      "url": "https://docs.google.com/spreadsheets/d/1HrcReS9fHohnWzptsILGsaW01Mt55LSPaf44Lq8-A2Q/edit?usp=drive_link",
      "embed": true,
      "download": true
    }
  },
  "features": {
    "embed_spreadsheet": true,
    "inline_editing": true,
    "download_button": true,
    "user_management": true,
    "link_management": true,
    "page_editing": true
  }
};