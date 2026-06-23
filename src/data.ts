import { Talent, Brand } from './types';

export const BRANDS: Brand[] = [
  {
    id: 'b1',
    name: 'Brand 1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAue8Fm-pqGMzAai3QdOyd8mq0A4AlWxHvZYBH_ZxuUARrZn4WFvLlLY7rFJPWRkZRdvp2xRy8-LNSm6QgEVY1PFmf-nqSocytnhSUemsHy2UQNLSQRdycKUUCJDG_8PJhfMX1vrVDWtrBo93mWXIVcHe5hdazZ4ZlK0qwoMms6D_zLnjG1z6OT6L4K_U7AyuQxltBhSwCufabIB1moOJ_o1ZpR6Uj3wC3HJNtXqp4MEZc5UairygKKVL0-lYcmmiYkOY2ao_6F9A0',
    height: 'h-12'
  },
  {
    id: 'b2',
    name: 'Brand 2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLPS_s65gBf3OYATlGr5EKmjz5nscK_3oPL4_VouTNxF5kqGQPtz8tbCGAPCeuBj2yfESzGYUYiXpOlxM_ho_HGl8s4HFPSRJaa8FMvg7a2sy9b1cT64EF_gQyhoc0xaHwZo2_ZK6z4W4ruEfDibjclZLskJC2cnF1bzXqnqpNO42uVUH3aeKxcRSbT-F5doK85VomXGH8TMIbcCMWdpPmFPLZCF_Nb0Mz4LCyPGdGVnLDfVb7qutMKVaBDYg2WoA_oBcMpIZVQSM',
    height: 'h-10'
  },
  {
    id: 'b3',
    name: 'Brand 3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzQLnbloMPbpjdKMlV7e3d3zpM3EKFFwT-Nrfo8FlWreJiHEGFGTK61kZnBangHLPlo2w08on28H04V_c37ArsckjWYm5QDoOUxegWDVfn-F0KgnrbGWrKQ2YtcvUSgRrReO066pDm8ndehQl6Q3cAm3bUIMb8KLirC-OcWoSLJAG2Fcb2T3IbM89nAL8W3GCGAXgJSiZNSdXOdFu03Eq7tGakTSrkjBodAvvxi0xZqccC3GMy1HUu2osOv7u83bODCs_FDqlh1Ik',
    height: 'h-10'
  },
  {
    id: 'b4',
    name: 'Brand 4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB860_-6PtxPdVsHexJFkE-LW_IbIrRHcmykDqKPfT-q1S5LaMUDkUikr8psX6qlA35Ewb86_y0NadgDyew4eJe7j2o1rKRz0tMktO3dy_e-MSHT90mfhbsZkJosfMB-sUNU8xNJlfSLTkcuM0GCqKyDi8H_WD2ZL25Ne60RH9m4tBzy6YCeELMTCArkZPMR10AgxIQcKnwskpeYzQer4nOzZkpuKaPM05dzzKf3X5U06efuNerRN_m3MEwVxROBYl4I6wL9aBPDUI',
    height: 'h-12'
  },
  {
    id: 'b5',
    name: 'Brand 5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn2fjMdcIxfPZKOxfTBZcYL2f1d8EoFsYYUadBSae8VpkOoarIg8ijyQ0nHW2SwVGTfLi7zEL-4F9EUyoCXVYeYZFxS1kFpDu7tWiMiHq08EiNCHNFw8nKnij-e_ry-kDHTNbAWPcrmOSk7Rddv4N4Wsby5vB880AZsWIs-w5zEbvuu3Qv50FPaZhVmfvBkaUcJCER_C2KeTW8GdDtJhO_kGdqyw4J6U2AI-VdO1WRHtk4l9phrjxqpNORR1uFsCxAQwjoa0emJKY',
    height: 'h-12'
  },
  {
    id: 'b6',
    name: 'Brand 6',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChAcizx-vN3uP_qYdB0VaabQdgJmHeHrLzX2UKqhOmINsvILoqKlcwamu9PqLs0VJt5vqgZ5X55QQkY6Sx8U6BDZAgASKqstuUOLXxuV3PkZYBYYJnPXyewnjAZ8407mCshgCtvesDFLXW9g3-VpibjxsTqyg-VLe7gH5dvto-mhXUgcrtNBE-yolKJF6J9qJLFGt31fleSkhLS3oEcag2x3nVQqv2gkCBR5sERC0ACbgcmQNJn2FU1nlNVP9vtsy2qHrAnJANs7w',
    height: 'h-12'
  },
  {
    id: 'b7',
    name: 'Brand 7',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPo-0ufjAVlp7b3xb8pkG55Pgu-cEanH1AJ4RV1ArDIyRlgFm-D1-oFrHv-RP1TbIOZQNBT-u-5D6AXoQUkGNj9QYp83OlwOdsSqdXYHj7powRbrG9w9wtQaafdpCiIv2h0Uka7srAiSTwf8RqviPd2Okgphd9EzhR0Ncz4ueO157qbT8rd9hGEr11Jgp2IGDMGGnPtLD1ris4a0gieepkJCGzT6TB7sGNlJAhtl1c_7-LYm05A8wDwFZIFXn3wXnCM8JPDu2KHFQ',
    height: 'h-10'
  },
  {
    id: 'b8',
    name: 'Brand 8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4_aIMFFywVHTnirNDqeXMv_AZ-MXyjiZMAqM7G3x3p7WCUw1WoLQJa6OIr74T1osrRlf43J_SKDEFQsbcwxHH9brOsz8jjgz4kkvdqRKTIR9OF0h5UXAwcPmCiweaOAXflRZFb9EaEhfkR7wrPz9usyD-OsAN-MmNPm1dhkpryAUd0HgfgLCvJvXYMFEUpO-3vf7M6POO3d7jVMtUa7EILVkA7Q4BkzMQ1t1DG3ppCV_3MteXhxoy0aJTf0wZ_H7UY2MFN5yai5k',
    height: 'h-10'
  },
  {
    id: 'b9',
    name: 'Brand 9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMwOZGhfql-pQFVYLLU_4-o9mgo9qkAURnQadeQwx08SIgowTenmUUUzrhyDLdKOB8TETTh61mLYKg01XTB2sw0WMbBnz3GW9dU146W_m1AuWwKu7dOofa99vt6xuBMZHZQvCTuAtFEorOsD_hnCzGIX3jVcXS86j5faR7A0j8tGAHQBYbftPnLvLF-F1NU9G23bj8f6djQU3_cn3TAjaUNpaod_dsimmmXd1yRX3AXVr8x7fiJJtqILwSrHraT16k3jO_foGt0as',
    height: 'h-12'
  },
  {
    id: 'b10',
    name: 'Brand 10',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHMD2NRNOLO1VhD1Gqv-aTCqHjAh0grAmaoZ4r7ys8CStf8d8pzPVbSZZGWaW1OvM24FmrhaBn1QNg95dJACl_9RNcgA2Ub_VRVJDN_TG51MDPlZqIB4O0XDNHHBlu3hwitnqhpcvasSVbtAlD-Gupbi9UHEZNyGRo35O5nRKPfYF3OwNRX96KiiXU4teW0XSEkxrOubqBCE5yVbg0O-blY4mIhA-lJ17-ihNaqQFJyHiZwIV79XgbsOWrU5-Qsv8BxL-oKtp_FfE',
    height: 'h-12'
  }
];

export const TALENTS: Talent[] = [
  {
    id: 'melisa-yildirim',
    name: 'Melisa Yıldırım',
    category: 'actor',
    categoryLabel: 'OYUNCU',
    roleLabel: 'Dizi & Sinema Oyuncusu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8RCi6zJS_FVThTczk72L8ovHb5VqXiX8IlNpUEtKSqwGaeqe_gTKTXJdjkOM_Zua1vYFPOjbZCUThtYvFdLe0ROrGcVnBU_LrJkFCMwmZ39MysaCo2tZuvqIRxSMYTnG2DRlf8vujTq0FkT5tKbMT0RWJtnDNhwNT2iAbDESSDgwt1N_2zGgJnVwtSvQ6VudLgw4ozAkHGACsTT1OL4JaXKPWKzbSlSvknsgu3nLlzfsHcXtZumWsvsyAfUPdr7MdMozBTfUX2YU',
    bio: 'Tiyatro kökenli kariyerine uluslararası projelerle devam eden Melisa, karakter derinliği ve güçlü sahne aurasıyla modern Türk sinemasının yükselen yıldızları arasında yer alıyor.',
    age: 26,
    height: '174 cm',
    eyeColor: 'Ela',
    education: 'Mimar Sinan Konservatuvarı',
    socials: {
      instagram: '1.2M',
      tiktok: '850K',
      youtube: '320K'
    },
    projects: [
      {
        id: 'mp1',
        title: 'Sonsuz Gökyüzü',
        type: 'Dizi | 2023',
        role: 'Başrol: Elif Karakteri',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG7oQuhfSIitzqd7WZUwLn6clEBEvDJP9M57rgysxHe7kB0Req-qBPlPrkvb4E6M23J9Ov_BLeoMv6Gjmms_85blGa7a3b0W4hhl0ebU_ekrmAPUmomYUiUtT5xfeOvUfIvV1TZkDOqKTHkPP0OLTqnZCWagnyXZZH6_Q1catS_kMsqZ5MiPtHkdlPXWVWD8XNTkg-zQzKg-zNrazyomeadUVqnjSJ6t4knpQU5w24cjmX8U01KQXaZaKQPsc20R3AWbz_XdQJBZY'
      },
      {
        id: 'mp2',
        title: "L'Elegance Parfüm",
        type: 'Reklam | 2023',
        role: 'Kampanya Yüzü',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX4q0iG0WoDEbWNDB4LjVd0nCy2f9pVYqAnSsC33FRRJq8x70LKAL0xSeyju2BoIvFmJQPBTVcp0phRMnEjBMB8quPMr3CM2qvBKKhnjTTinXIHc0NPPr5pGgb1_kGcJpoEsoyZufZzNFejGQAkJw2DKbr-FyM9WlLYCrndWqIPi0FPLhK8BUuflgR5QgCnZptOlGmr0r4AFECC3Osl_xKaRCTQ4O9qce9qbswYzn7H4cdPqRJokZXG-MomAObwNAHogeocz9YCsk'
      },
      {
        id: 'mp3',
        title: 'Kayıp Zamanlar',
        type: 'Sinema | 2022',
        role: 'Yardımcı Kadın Oyuncu',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL7yPABz9zcPbCquY1LWuM67Yn0XAUklCVAE7D-S_cl9ccNXcj7f0sNEnHHWCEKbzYGUSsvK76c1RjvswYk3vS7ml1Z5qTlsop-YiXKJx1E3z6m73ek90YyNo8zHdeSVkX-dON7xpRXhgPyRL5dE8IBu1AYQndHuq9wZJ9TFBDUgTtnkPlObjQZs_Xr32Ww_YcRaz55-jlZBxknc01sbf39wl9HXl-uxWE8PfP3_Pp6YeG8tbM5YA5jEMyGn5QNzeeiVKIDIEmllY'
      }
    ]
  },
  {
    id: 'selda-yilmaz',
    name: 'Selda Yılmaz',
    category: 'influencer',
    categoryLabel: 'INFLUENCER',
    roleLabel: 'Moda & Stil Trendsetter',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHt4eTqKEqbmncwxLhFuHnmH9LJrpj3Tc-FzFJ9GS_NbUKnsVjqfBRFXzbWzn-BdbvQCIMQ9bXwvkgavahERGbATygQhhgsJ1ay94Ti1RSUXpo9oljUgn1WY18xwBIY-RZLoGumMA8k6MiDcLXhCu-e6W2JelVGw1r5ZDESdM37O7XjA2dEr69FjFpVvnK6GbVp3japsD4jC3W-0BBuOTRluabxaMXVW4LPzYw53x0zF0--kD2yx0XXCXYqn3YE64Js0dFvU5BbW4',
    bio: 'Yüksek moda alanındaki yenilikçi kombinleri ve zarafetiyle tanınan Selda, lüks markaların en çok tercih ettiği dijital marka kurucusu ve partneridir.',
    age: 24,
    height: '172 cm',
    eyeColor: 'Yeşil',
    education: 'İTÜ Moda Tasarımı',
    socials: {
      instagram: '2.4M',
      tiktok: '950K',
      youtube: '150K'
    },
    projects: [
      {
        id: 'selda-p1',
        title: 'Paris Fashion Week Spotlight',
        type: 'Etkinlik | 2024',
        role: 'Özel Davetli & İçerik Partneri',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm5yCXGuCJ8TqWqDlLAKv3Vu80daFLUecOu8QHgLM8db1HO0-oUPSu4UQyAdwdVurJGx3vAv7GLZOzBhaPDAdC8zrc2ba9Pbttrnvq1WBR8rq8wfNcz3LRT5_m9ZahfE7iWu-l-e6hp8Xy4jui4FQkaTfYXRnesLLcyBPgrWdzK-SQHyB-xqOfcTDUMlMhWKlIE3xZnwCoyA7-QB5VyqU9BxltSzrjnppaey2VSJ-1e_A8LgyivNxQsNUrWKXDFZljtUvAi4VYh7o'
      },
      {
        id: 'selda-p2',
        title: 'Vogue Essentials',
        type: 'Kampanya | 2023',
        role: 'Yılın En İyi Moda Influencerı',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG7oQuhfSIitzqd7WZUwLn6clEBEvDJP9M57rgysxHe7kB0Req-qBPlPrkvb4E6M23J9Ov_BLeoMv6Gjmms_85blGa7a3b0W4hhl0ebU_ekrmAPUmomYUiUtT5xfeOvUfIvV1TZkDOqKTHkPP0OLTqnZCWagnyXZZH6_Q1catS_kMsqZ5MiPtHkdlPXWVWD8XNTkg-zQzKg-zNrazyomeadUVqnjSJ6t4knpQU5w24cjmX8U01KQXaZaKQPsc20R3AWbz_XdQJBZY'
      }
    ]
  },
  {
    id: 'mert-demir',
    name: 'Mert Demir',
    category: 'actor',
    categoryLabel: 'OYUNCU',
    roleLabel: 'Drama & Aksiyon Oyuncusu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJo7mV-8HD6s_LNFXazi43wXK33XJBhuP-Tg6FE1EotHdLvqunTuoCge3k93rxJPxbcnd408QAimtaa4V5N96lYPpmpyk3yznZ1_7q67vv6S25u2h0r8O_kum_yz3SoZ3vmv6Y8TuY_zSBWI6hsz9TNAoioi4h1bKrbBGpX93ibwPG5M5PSGYiC3RzLpAzc_P0OMZCxLUEhLepYErbzB9omPOLGbXsOKP313HLLboar5JESHGSVsRt5AgbiM39lhab7uis99ZS90',
    bio: 'Derin karakter tahlilleri ve karizmatik duruşuyla tanınan Mert, hem ulusal televizyon dizilerinin lider başrolü hem de bağımsız sinemanın vazgeçilmez karakteridir.',
    age: 29,
    height: '185 cm',
    eyeColor: 'Kahverengi',
    education: 'İstanbul Üniversitesi Tiyatro Bölümü',
    socials: {
      instagram: '1.8M',
      tiktok: '420K',
      youtube: '110K'
    },
    projects: [
      {
        id: 'mert-p1',
        title: 'Kuzey Rüzgarları',
        type: 'Dizi | 2023',
        role: 'Başrol - Demir Karakteri',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG7oQuhfSIitzqd7WZUwLn6clEBEvDJP9M57rgysxHe7kB0Req-qBPlPrkvb4E6M23J9Ov_BLeoMv6Gjmms_85blGa7a3b0W4hhl0ebU_ekrmAPUmomYUiUtT5xfeOvUfIvV1TZkDOqKTHkPP0OLTqnZCWagnyXZZH6_Q1catS_kMsqZ5MiPtHkdlPXWVWD8XNTkg-zQzKg-zNrazyomeadUVqnjSJ6t4knpQU5w24cjmX8U01KQXaZaKQPsc20R3AWbz_XdQJBZY'
      },
      {
        id: 'mert-p2',
        title: 'Geçit Yok',
        type: 'Aksiyon Filmi | 2022',
        role: 'Başrol Oyuncusu',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL7yPABz9zcPbCquY1LWuM67Yn0XAUklCVAE7D-S_cl9ccNXcj7f0sNEnHHWCEKbzYGUSsvK76c1RjvswYk3vS7ml1Z5qTlsop-YiXKJx1E3z6m73ek90YyNo8zHdeSVkX-dON7xpRXhgPyRL5dE8IBu1AYQndHuq9wZJ9TFBDUgTtnkPlObjQZs_Xr32Ww_YcRaz55-jlZBxknc01sbf39wl9HXl-uxWE8PfP3_Pp6YeG8tbM5YA5jEMyGn5QNzeeiVKIDIEmllY'
      }
    ]
  },
  {
    id: 'ece-erken-talent',
    name: 'Ece Erken',
    category: 'broadcaster',
    categoryLabel: 'YAYINCI',
    roleLabel: 'Kreatif Talk Show & Canlı Yayıncı',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSYf02nFEr9S0vNOQWtaOg5V86dyewu1WAA7Pism0DsPPflKrc-yOXNNxX4KsZ6PYkoUldsH4jSJT5Kg7fzTyZuaCjR_4osUDqVEPx-AjITWrNcFMVjDyY4GlkVnUXmHpmdSfYv1YeDeRITgrn4eyvOKJigZs8Zp3xof1nAvXxbC-jgEAHDVk2i26TSRPZFqfl-Ix34FHIc1QuPV-Bmz5bmB4wxJSgFlGI7Id9sI5eId0LhteZJll1jFknZv3RWPuDOmksY-wjxnM',
    bio: 'Canlı stüdyo enerjisini ekran başındakilere mükemmel aktaran Ece, eğlence, oyun ve teknoloji odaklı global yayın dünyasında öncüdür.',
    age: 25,
    height: '168 cm',
    eyeColor: 'Mavi',
    education: 'Bahçeşehir Yeni Medya',
    socials: {
      instagram: '950K',
      tiktok: '1.5M',
      youtube: '850K'
    },
    projects: [
      {
        id: 'ece-p1',
        title: 'Gen-Z On Air',
        type: 'Canlı Yayın Serisi | 2024',
        role: 'Sunucu & Yapımcı',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARVRqEAl0HtQrnc-IPscxN8JLFrS7CNw1vrMeyfe4yTKp5i1DEn06CRDRGvmRZR6rZo1I2UhXGc61uNMPns54uVyxUOjQioBE_fGspPkS8LgEmnDuKzin5kj4qUPesftjhVdnJkqr6LxHns56af--9O-3LdDbUyGUUJOhLtE76sK8tcVQwczWOvwZ1KLspIZWhTCza6MAv_dhX7kHGgEpGWOuVVnB4-p0I9oH70V7QLrzUklYOuwORBmfT7F0QK5t3X3B-2T1HCeA'
      }
    ]
  },
  {
    id: 'can-atilla',
    name: 'Can Atilla',
    category: 'influencer',
    categoryLabel: 'INFLUENCER',
    roleLabel: 'Seyahat & Kültür Kaşifi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbGcB2H-PwJLGFglbptNBgj1EygHvp8v8IPSWGDM4dahbEgdYYOajivK4Dkv27U4GhZX7pu3l2794LfVcbyH0R65y9ZO01lMZILcWI9N9rVCV03o9S3hW9n1LfglT2x5YyAmS2OdM4Xk25j8fM73x7WVj-2f7GYyJL0Xx_EB1lfJrWbCe3QTsHn2nvQBlUbC51-Ua7TXtxRYsTXF5jxTsTmhwTI6IlVuqNQS0DEiAARtoTizArwky5xV60u8q5O509sJX6vwkcHe4',
    bio: 'Farklı coğrafyaların ve gizli rotaların hikayelerini muhteşem sinematik kadrajlarla anlatan Can, seyahat kültürünün en etkili dijital influencerlarından biridir.',
    age: 28,
    height: '180 cm',
    eyeColor: 'Kahverengi',
    education: 'Galatasaray Üniversitesi İletişim',
    socials: {
      instagram: '1.5M',
      tiktok: '500K',
      youtube: '980K'
    },
    projects: [
      {
        id: 'can-p1',
        title: 'Sınırların Ötesinde',
        type: 'Belgesel Serisi | 2023',
        role: 'Yönetmen & Anlatıcı',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxuj8pWTXPAP9Pv47-5lwjZd2LyIKmjuJbE90cfvoiTVUB7bsVOXmktKXHwCWCSrHrSAst9oTI2LK8wxRmn58v_b6tDuY2SvM4r_67xtmYwC-u7r6xhZtJ5rqC8-SR_RmBHXTB4IHpbMSZEYPxHaYRww5WtKvUVsL2x2XGkKad0Vr-Dbs2WlfJ2uWBZHCWaVJd4NMaNYQ1mtQFxIqHeDWWcbNLJsT7XwoS2JH4AmACqPLjl_ozsYxiZ53dhMDDlQcBIKFxg7UayZY'
      }
    ]
  },
  {
    id: 'derya-yildiz',
    name: 'Derya Yıldız',
    category: 'actor',
    categoryLabel: 'OYUNCU',
    roleLabel: 'Klasik & Modern Karakter Sanatçısı',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlh9xl-Pb9K8Dq6FBPuH7-b6SvJhdn2becuTaeFrOoYXi0UCCciP6s2cKjZhscHMTCfJxH9uWZbwqcQgQBePPvFRATNYSB2xCJZqXt0QMOGUzCnKCqlbxH1ueuQeHuF77lLTmWQZBH-FRUvXKJq0nYnEL8ODWbn6LF9CxG32ZFD9qBUO5H4ScjNdkv_Ep99lQ-SCqW48QM-xMV_jLTMx9y7hNvfyy5UcLBeM2nHRlpLBCoxJN_t_F9wtqTOwwBlGjYF55YvOhnFlo',
    bio: 'Geçmişten gelen vintage Hollywood asaletini modern performans metodlarıyla harmanlayan Derya, ödüllü oyunculuk performanslarıyla öne çıkmaktadır.',
    age: 27,
    height: '170 cm',
    eyeColor: 'Ela',
    education: 'Hacettepe Üniversitesi Devlet Konservatuvarı',
    socials: {
      instagram: '1.1M',
      tiktok: '350K',
      youtube: '120K'
    },
    projects: [
      {
        id: 'derya-p1',
        title: 'Gözlerin Ardında',
        type: 'Sinema | 2023',
        role: 'Başrol - Elveda Karakteri',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL7yPABz9zcPbCquY1LWuM67Yn0XAUklCVAE7D-S_cl9ccNXcj7f0sNEnHHWCEKbzYGUSsvK76c1RjvswYk3vS7ml1Z5qTlsop-YiXKJx1E3z6m73ek90YyNo8zHdeSVkX-dON7xpRXhgPyRL5dE8IBu1AYQndHuq9wZJ9TFBDUgTtnkPlObjQZs_Xr32Ww_YcRaz55-jlZBxknc01sbf39wl9HXl-uxWE8PfP3_Pp6YeG8tbM5YA5jEMyGn5QNzeeiVKIDIEmllY'
      }
    ]
  },
  {
    id: 'bora-karaca',
    name: 'Bora Karaca',
    category: 'broadcaster',
    categoryLabel: 'YAYINCI',
    roleLabel: 'Teknoloji & Sohbet Podcast Öncüsü',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3BmueiBo8Y0flLUfeawjknhwCL04qmo6_DmhHJhmit7ZxyabsZdxxeqncRzwg4xvOlQLi0vqkRGfn55XMPeer_wsMaCtTbs-uAV91SJ3tWwrFSXFVxVZPkvmVR1Lu-4s3ObJRQJIAE_G93wJSRxF70cML1Kai0o6Md6UsAkDITCoHpz86bQVW3nn2WrYa1Zqi9xLluhvHX2OIIitsR1nzFw4qbbZDL0f6IZz-JMS5MIYdH3lqPit2qHnrZ-Yahmi6Z0Z-pr6rlZg',
    bio: 'Girişimcilik ve teknoloji arenasındaki samimi sohbetleriyle kitleleri sürükleyen Bora, Türkiye\'nin en çok dinlenen teknoloji podcast ve video serilerinin mimarıdır.',
    age: 31,
    height: '182 cm',
    eyeColor: 'Kahverengi',
    education: 'Bilkent Üniversitesi Bilgisayar Mühendisliği',
    socials: {
      instagram: '750K',
      tiktok: '300K',
      youtube: '1.2M'
    },
    projects: [
      {
        id: 'bora-p1',
        title: 'Tech & Future Podcast',
        type: 'Podcast Serisi | 2023',
        role: 'Moderatör & Yapımcı',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3BmueiBo8Y0flLUfeawjknhwCL04qmo6_DmhHJhmit7ZxyabsZdxxeqncRzwg4xvOlQLi0vqkRGfn55XMPeer_wsMaCtTbs-uAV91SJ3tWwrFSXFVxVZPkvmVR1Lu-4s3ObJRQJIAE_G93wJSRxF70cML1Kai0o6Md6UsAkDITCoHpz86bQVW3nn2WrYa1Zqi9xLluhvHX2OIIitsR1nzFw4qbbZDL0f6IZz-JMS5MIYdH3lqPit2qHnrZ-Yahmi6Z0Z-pr6rlZg'
      }
    ]
  },
  {
    id: 'selin-aksu',
    name: 'Selin Aksu',
    category: 'influencer',
    categoryLabel: 'INFLUENCER',
    roleLabel: 'Güzellik & Kozmetik Trendsetteri',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3n5fBsvTPdkLUOvKPJV_Uhoc5x_xZnTAI3qWvF23KihjXeLHyaYldvCmU0vnWzuP3OOMNfgJcpLY3O165n1oRaZO23_w3fUT9qLwY9dTByXoGNjBXRRTRgA5-M_Jrehr_Tkl6FDkMuCxM6BLkrSJ2uHy0hHEUMrQRD_ptnkh9gpeLXon6SXo1W1GklFhLDYMKFCtEt_SivMTkbU_dqczfUkwmtA76Eb8T6Frnfn2iPArFo0JdCWjEzf7v1ROWottcWR5Cz4gvqOE',
    bio: 'Yaratıcı kozmetik sanatı ve günlük güzellik tüyolarıyla milyonların beğenisini toplayan Selin, dünya kozmetik devlerinin lider kampanya yüzüdür.',
    age: 23,
    height: '165 cm',
    eyeColor: 'Mavi',
    education: 'Koç Üniversitesi İşletme',
    socials: {
      instagram: '3.1M',
      tiktok: '2.4M',
      youtube: '1.8M'
    },
    projects: [
      {
        id: 'selin-p1',
        title: 'Beauty Bloom Campaign',
        type: 'Reklam | 2024',
        role: 'Global Reklam Yüzü',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3n5fBsvTPdkLUOvKPJV_Uhoc5x_xZnTAI3qWvF23KihjXeLHyaYldvCmU0vnWzuP3OOMNfgJcpLY3O165n1oRaZO23_w3fUT9qLwY9dTByXoGNjBXRRTRgA5-M_Jrehr_Tkl6FDkMuCxM6BLkrSJ2uHy0hHEUMrQRD_ptnkh9gpeLXon6SXo1W1GklFhLDYMKFCtEt_SivMTkbU_dqczfUkwmtA76Eb8T6Frnfn2iPArFo0JdCWjEzf7v1ROWottcWR5Cz4gvqOE'
      }
    ]
  },
  {
    id: 'emre-can-talent',
    name: 'Emre Can',
    category: 'broadcaster',
    categoryLabel: 'YAYINCI',
    roleLabel: 'Sokak & Şehir Kültürü Muhabiri',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA9Um9Dqd-GAW3MI0ga1YFLlmQXaUb3JljV0UhqgR4-cglPayl8-l8yiOUQuO_p1ZVd2om7MVSliwXUjNItrJ3ZwB0dfKxIJtl3UIOIOUwvfYO1BmDbhjyJCY9UFRPgWsuPR-OqDMa4kqrMlKQYEYyTcE751xEA7RzTNrbuWGVVTxbwBVQcVEizbQnweFAugCaIcM_y-PE3uehngOHJPdJ3ATNXm2hM_-ONbamKLd795oFal42EQEvRviKo4tpkhTNfLdOmV4jIo4',
    bio: 'Samimi sokak röportajları, şehir kültürünün yansımaları ve eğlenceli sosyal deneyleriyle tanıdığımız Emre, dijital haberciliğin taze, dinamik sesidir.',
    age: 26,
    height: '178 cm',
    eyeColor: 'Yeşil',
    education: 'Marmara Üniversitesi İletişim Fakültesi',
    socials: {
      instagram: '1.2M',
      tiktok: '1.8M',
      youtube: '950K'
    },
    projects: [
      {
        id: 'emre-p1',
        title: 'Sokağın Nabzı',
        type: 'Haber & Röportaj | 2023',
        role: 'Yaratıcı Sunucu',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA9Um9Dqd-GAW3MI0ga1YFLlmQXaUb3JljV0UhqgR4-cglPayl8-l8yiOUQuO_p1ZVd2om7MVSliwXUjNItrJ3ZwB0dfKxIJtl3UIOIOUwvfYO1BmDbhjyJCY9UFRPgWsuPR-OqDMa4kqrMlKQYEYyTcE751xEA7RzTNrbuWGVVTxbwBVQcVEizbQnweFAugCaIcM_y-PE3uehngOHJPdJ3ATNXm2hM_-ONbamKLd795oFal42EQEvRviKo4tpkhTNfLdOmV4jIo4'
      }
    ]
  }
];
