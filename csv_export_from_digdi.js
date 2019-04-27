const express = require('express');

const mongoose = require('mongoose');
const db = require('./config/keys').mongouri;
// Load Mongoose models
const Catalog = require('./models/Catalog');
const Category = require('./models/Category');

mongoose
  .connect(db)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const categories = [
  {
    russtitle: 'Планшеты',
    title: 'planshety',
    url: 'planshety',
    image: 'http://digdi.ru/wp-content/uploads/2018/07/ipad-air-64-gb.jpg'
  },
  {
    russtitle: 'Аудиосистемы и компоненты',
    title: 'audiosistemy',
    url: 'audiosistemy',
    image: 'http://digdi.ru/wp-content/uploads/2019/01/audoisistemy.jpg'
  },
  {
    russtitle: 'Фотоаппараты и видеокамеры',
    title: 'fotoapparaty',
    url: 'fotoapparaty',
    image: 'http://digdi.ru/wp-content/uploads/2019/01/foto_videokamera.jpg'
  },
  {
    russtitle: 'Жесткие диски',
    title: 'gestkiediski',
    url: 'gestkiediski',
    image: 'http://digdi.ru/wp-content/uploads/2018/06/hdd.jpg'
  },
  {
    russtitle: 'Материнские платы',
    title: 'motherboards',
    url: 'motherboards',
    image: 'http://digdi.ru/wp-content/uploads/2018/06/motherboards.jpg'
  },
  {
    russtitle: 'Системы охлаждения',
    title: 'coolers',
    url: 'coolers',
    image: 'http://digdi.ru/wp-content/uploads/2018/06/coolers.jpg'
  },
  {
    russtitle: 'Блоки питания',
    title: 'psu',
    url: 'psu',
    image: 'http://digdi.ru/wp-content/uploads/2018/06/psu.jpg'
  },
  {
    russtitle: 'Офисные компьютеры и оргтехника',
    title: 'office',
    url: 'office',
    image: 'http://digdi.ru/wp-content/uploads/2019/01/oficnaya_tehnika.jpg'
  },
  {
    russtitle: 'Мониторы и Телевизоры',
    title: 'displays',
    url: 'displays',
    image: 'http://digdi.ru/wp-content/uploads/2018/07/монитор-27.jpg'
  },
  {
    russtitle: 'Автоэлектроника',
    title: 'car',
    url: 'car',
    image: 'http://digdi.ru/wp-content/uploads/2019/01/avtoelektronika1.jpg'
  },
  {
    russtitle: 'Ноутбуки',
    title: 'notebooks',
    url: 'notebooks',
    image: 'http://digdi.ru/wp-content/uploads/2019/01/noutbuki.jpg'
  },
  {
    russtitle: 'Игровые компьютеры и приставки',
    title: 'pc',
    url: 'pc',
    image: 'http://digdi.ru/wp-content/uploads/2019/01/10534-quietpcxboxbundle.jpg'
  },
  {
    russtitle: 'Смартфоны',
    title: 'phones',
    url: 'phones',
    image: 'http://digdi.ru/wp-content/uploads/2018/06/iphone-5s.jpg'
  },
  {
    russtitle: 'Комплектующие',
    title: 'parts',
    url: 'parts',
    image: 'http://digdi.ru/wp-content/uploads/2019/01/komplektujushie.png'
  },
  {
    russtitle: 'Память',
    title: 'memory',
    url: 'memory',
    image: 'http://digdi.ru/wp-content/uploads/2018/06/memory.jpg'
  },
  {
    russtitle: 'Процессоры',
    title: 'processors',
    url: 'processors',
    image: 'http://digdi.ru/wp-content/uploads/2018/06/processors.jpg'
  },
  {
    russtitle: 'Видеокарты',
    title: 'videocards',
    url: 'videocards',
    image: 'http://digdi.ru/wp-content/uploads/2018/06/videocards.jpg'
  },
  {
    russtitle: 'Разное',
    title: 'uncategorized',
    url: 'uncategorized',
    image: ''
  }
];


const data =
  [
    {
      "decription":"",
      "category": "displays",
      "title": "Монитор 27\"",
      "longtitle": "Монитор 27\"",
      "itemurl": "http://digdi.ru/product/%d0%bc%d0%be%d0%bd%d0%b8%d1%82%d0%be%d1%80-27/",
      "price": "8200",
      "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-27.jpg",
      "externalurl": ""
    },
  {
    "decription": "",
    "category": "displays",
    "title": "Монитор 24\" 1920х1080",
    "longtitle": "Монитор 24\" 1920х1080",
    "itemurl": "http://digdi.ru/product/%d0%bc%d0%be%d0%bd%d0%b8%d1%82%d0%be%d1%80-24-1920%d1%851080/",
    "price": "5000",
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-24.jpg",
    "externalurl": ""
  },
  {
    "decription": "",
    "category": "displays",
    "title": "Монитор 22\" 1600х900",
    "longtitle": "Монитор 22\" 1600х900",
    "itemurl": "http://digdi.ru/product/%d0%bc%d0%be%d0%bd%d0%b8%d1%82%d0%be%d1%80-22-1600%d1%85900/",
    "price": "3500",
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-22-1600х900.jpg",
    "externalurl": ""
  },
  {
    "decription": "",
    "category": "displays",
    "title": "Монитор 20\"",
    "longtitle": "Монитор 20\"",
    "itemurl": "http://digdi.ru/product/%d0%bc%d0%be%d0%bd%d0%b8%d1%82%d0%be%d1%80-20/",
    "price": "3000",
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-20.jpg",
    "externalurl": ""
  },
  {
    "decription": "",
    "category": "displays",
    "title": "Монитор 19\" широкоформатный",
    "longtitle": "Монитор 19\" широкоформатный",
    "itemurl": "http://digdi.ru/product/%d0%bc%d0%be%d0%bd%d0%b8%d1%82%d0%be%d1%80-19-%d1%88%d0%b8%d1%80%d0%be%d0%ba%d0%be%d1%84%d0%be%d1%80%d0%bc%d0%b0%d1%82%d0%bd%d1%8b%d0%b9/",
    "price": "2500",
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "",
    "category": "displays",
    "title": "Монитор 19\" 3:4",
    "longtitle": "Монитор 19\" 3:4",
    "itemurl": "http://digdi.ru/product/%d0%bc%d0%be%d0%bd%d0%b8%d1%82%d0%be%d1%80-19-34/",
    "price": "2000",
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-3х4.jpg",
    "externalurl": ""
  },
  {
    "decription": "",
    "category": "planshety",
    "title": "ASUS ZenPad 10 Z300CG",
    "longtitle": "ASUS ZenPad 10 Z300CG",
    "itemurl": "http://digdi.ru/product/asus-zenpad-10-z300cg/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "встроенная память 16 ГБ, слот microSDXC",
    "category": "planshety",
    "title": "SAMSUNG Galaxy Tab A 10.1",
    "longtitle": "SAMSUNG Galaxy Tab A 10.1",
    "itemurl": "http://digdi.ru/product/samsung-galaxy-tab-a-10-1/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "встроенная память 32 ГБ, без слота для карт памяти",
    "category": "planshety",
    "title": "Apple iPad 2 32gb",
    "longtitle": "Apple iPad 2 32gb",
    "itemurl": "http://digdi.ru/product/apple-ipad-2-32gb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "встроенная память 64 ГБ, без слота для карт памяти",
    "category": "planshety",
    "title": "Apple iPad Air 64Gb",
    "longtitle": "Apple iPad Air 64Gb",
    "itemurl": "http://digdi.ru/product/apple-ipad-air-64gb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "встроенная память 32 ГБ, слот microSDXC, до 64 ГБ",
    "category": "planshety",
    "title": "ASUS Transformer Book T100TA",
    "longtitle": "ASUS Transformer Book T100TA",
    "itemurl": "http://digdi.ru/product/asus-transformer-book-t100ta/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "встроенная память 64 ГБ, слот microSDHC, до 32 ГБ",
    "category": "planshety",
    "title": "Acer Iconia Tab W511",
    "longtitle": "Acer Iconia Tab W511",
    "itemurl": "http://digdi.ru/product/acer-iconia-tab-w511/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "встроенная память 16 ГБ, без слота для карт памяти",
    "category": "planshety",
    "title": "Apple iPad mini 16 gb",
    "longtitle": "Apple iPad mini 16 gb",
    "itemurl": "http://digdi.ru/product/ipad-mini/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "мощность 2x50 Вт",
    "category": "planshety",
    "title": "B&W Zeppelin",
    "longtitle": "B&W Zeppelin",
    "itemurl": "http://digdi.ru/product/bw-zeppelin/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "запись видео Full HD 1080p",
    "category": "fotoapparaty",
    "title": "Видеокамера Samsung HMX-H320BP Full HD",
    "longtitle": "Видеокамера Samsung HMX-H320BP Full HD",
    "itemurl": "http://digdi.ru/product/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be%d0%ba%d0%b0%d0%bc%d0%b5%d1%80%d0%b0-samsung-hmx-h320bp-full-hd/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "1024 МБ видеопамяти GDDR5",
    "category": "fotoapparaty",
    "title": "Видеокарта GTX 650 Ti",
    "longtitle": "Видеокарта GTX 650 Ti",
    "itemurl": "http://digdi.ru/product/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be%d0%ba%d0%b0%d1%80%d1%82%d0%b0-gtx-650-ti/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "беспроводной контроллер в комплекте",
    "category": "other",
    "title": "Игровая приставка Sony PlayStation 3",
    "longtitle": "Игровая приставка Sony PlayStation 3",
    "itemurl": "http://digdi.ru/product/playstation-3/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "беспроводной контроллер в комплекте",
    "category": "pc",
    "title": "Игровая приставка Sony PlayStation 4 Pro",
    "longtitle": "Игровая приставка Sony PlayStation 4 Pro",
    "itemurl": "http://digdi.ru/product/playstation-4-pro-1tb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "беспроводной контроллер в комплекте",
    "category": "pc",
    "title": "Игровая приставка Sony PlayStation 4",
    "longtitle": "Игровая приставка Sony PlayStation 4",
    "itemurl": "http://digdi.ru/product/playstation-4-500-gb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "поддержка двух SIM-карт",
    "category": "planshety",
    "title": "Смартфон Meizu M5 Note",
    "longtitle": "Смартфон Meizu M5 Note",
    "itemurl": "http://digdi.ru/product/meizu-m5-note-3gb-32gb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "2048 МБ видеопамяти GDDR5",
    "category": "videocards",
    "title": "Видеокарта GTX 770 2Gb",
    "longtitle": "Видеокарта GTX 770 2Gb",
    "itemurl": "http://digdi.ru/product/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be%d0%ba%d0%b0%d1%80%d1%82%d0%b0-gtx-770-2gb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "1024 МБ видеопамяти GDDR5",
    "category": "videocards",
    "title": "Видеокарта GTX 550 Ti",
    "longtitle": "Видеокарта GTX 550 Ti",
    "itemurl": "http://digdi.ru/product/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be%d0%ba%d0%b0%d1%80%d1%82%d0%b0-gtx-550-ti/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "2048 МБ видеопамяти GDDR5",
    "category": "videocards",
    "title": "Видеокарта GTX 750 Ti 2Gb",
    "longtitle": "Видеокарта GTX 750 Ti 2Gb",
    "itemurl": "http://digdi.ru/product/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be%d0%ba%d0%b0%d1%80%d1%82%d0%b0-gtx-750-ti-2gb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "4096 МБ видеопамяти GDDR5",
    "category": "videocards",
    "title": "Видеокарта GTX 1050 Ti 4Gb",
    "longtitle": "Видеокарта GTX 1050 Ti 4Gb",
    "itemurl": "http://digdi.ru/product/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be%d0%ba%d0%b0%d1%80%d1%82%d0%b0-gtx-1050-ti-4gb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "6144 МБ видеопамяти GDDR5",
    "category": "videocards",
    "title": "Видеокарта GTX 1060 6Gb",
    "longtitle": "Видеокарта GTX 1060 6Gb",
    "itemurl": "http://digdi.ru/product/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be%d0%ba%d0%b0%d1%80%d1%82%d0%b0-gtx-1060-6gb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "4096 МБ видеопамяти GDDR5",
    "category": "videocards",
    "title": "Видеокарта RX580",
    "longtitle": "Видеокарта RX580",
    "itemurl": "http://digdi.ru/product/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be%d0%ba%d0%b0%d1%80%d1%82-rx580/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "2048 МБ видеопамяти GDDR5",
    "category": "videocards",
    "title": "Видеокарта R9 270X",
    "longtitle": "Видеокарта R9 270X",
    "itemurl": "http://digdi.ru/product/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be%d0%ba%d0%b0%d1%80%d1%82%d0%b0-r9-270x/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "1024 МБ видеопамяти GDDR5",
    "category": "videocards",
    "title": "Видеокарта HD 6770",
    "longtitle": "Видеокарта HD 6770",
    "itemurl": "http://digdi.ru/product/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be%d0%ba%d0%b0%d1%80%d1%82%d0%b0-hd-6770/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "1024 МБ видеопамяти GDDR5",
    "category": "videocards",
    "title": "Видеокарта GTX 460",
    "longtitle": "Видеокарта GTX 460",
    "itemurl": "http://digdi.ru/product/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be%d0%ba%d0%b0%d1%80%d1%82%d0%b0-gtx-460/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "охлаждение: 1 вентилятор (80 мм)",
    "category": "psu",
    "title": "Блок питания 300 Вт",
    "longtitle": "Блок питания 300 Вт",
    "itemurl": "http://digdi.ru/product/%d0%b1%d0%bb%d0%be%d0%ba-%d0%bf%d0%b8%d1%82%d0%b0%d0%bd%d0%b8%d1%8f-300-%d0%b2%d1%82/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "стандарт ATX12V 2.3",
    "category": "psu",
    "title": "Блок питания 600 Вт",
    "longtitle": "Блок питания 600 Вт",
    "itemurl": "http://digdi.ru/product/%d0%b1%d0%bb%d0%be%d0%ba-%d0%bf%d0%b8%d1%82%d0%b0%d0%bd%d0%b8%d1%8f-600-%d0%b2%d1%82/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "поддержка двух SIM-карт",
    "category": "phones",
    "title": "Смартфон Huawei Y3 2017",
    "longtitle": "Смартфон Huawei Y3 2017",
    "itemurl": "http://digdi.ru/product/huawei-y3-2017/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "64 gb - 39900",
    "category": "phones",
    "title": "iPhone 7 plus",
    "longtitle": "iPhone 7 plus",
    "itemurl": "http://digdi.ru/product/iphone-7-plus/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "64 gb - 33200",
    "category": "phones",
    "title": "iPhone 7",
    "longtitle": "iPhone 7",
    "itemurl": "http://digdi.ru/product/iphone-7/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "32 gb - 18300",
    "category": "phones",
    "title": "iPhone 6s plus",
    "longtitle": "iPhone 6s plus",
    "itemurl": "http://digdi.ru/product/iphone-6s-plus/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "32 gb - 15700",
    "category": "phones",
    "title": "iPhone 6s",
    "longtitle": "iPhone 6s",
    "itemurl": "http://digdi.ru/product/iphone-6s/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "32 gb - 16700",
    "category": "phones",
    "title": "iPhone 6 plus",
    "longtitle": "iPhone 6 plus",
    "itemurl": "http://digdi.ru/product/iphone-6-plus/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "32 gb - 14500",
    "category": "phones",
    "title": "iPhone 6",
    "longtitle": "iPhone 6",
    "itemurl": "http://digdi.ru/product/iphone-6/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "32gb - 8900\"",
    "category": "phones",
    "title": "iPhone 5s",
    "longtitle": "iPhone 5s",
    "itemurl": "http://digdi.ru/product/iphone-5s/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "32gb - 6900",
    "category": "phones",
    "title": "iPhone 5",
    "longtitle": "iPhone 5",
    "itemurl": "http://digdi.ru/product/iphone-5/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "32 gb - 4900",
    "category": "phones",
    "title": "iPhone 4s",
    "longtitle": "iPhone 4s",
    "itemurl": "http://digdi.ru/product/iphone-4s-16gb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "Оп. память: 8 GB (можно поставить 16 и больше)",
    "category": "pc",
    "title": "Игровой компьютер i5 4570 + 1050Ti",
    "longtitle": "Игровой компьютер i5 4570 + 1050Ti",
    "itemurl": "http://digdi.ru/product/%d0%b8%d0%b3%d1%80%d0%be%d0%b2%d0%be%d0%b9-%d0%ba%d0%be%d0%bc%d0%bf%d1%8c%d1%8e%d1%82%d0%b5%d1%80-i5-4570-1050ti/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "",
    "category": "displays",
    "title": "Монитор 22\" 1920х1080",
    "longtitle": "Монитор 22\" 1920х1080",
    "itemurl": "http://digdi.ru/product/%d0%bc%d0%be%d0%bd%d0%b8%d1%82%d0%be%d1%80-22-1920%d1%851080/",
    "price": "4000",
    "image": "http://digdi.ru/wp-content/uploads/2018/06/lg-22m35.jpg",
    "externalurl": ""
  },
  {
    "decription": "2048 МБ видеопамяти GDDR5",
    "category": "videocards",
    "title": "Видеокарта GTX 670",
    "longtitle": "Видеокарта GTX 670",
    "itemurl": "http://digdi.ru/product/gtx-670/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "Частота процессора: 2300...3400 МГц",
    "category": "processors",
    "title": "Процессор i5-2400",
    "longtitle": "Процессор i5-2400",
    "itemurl": "http://digdi.ru/product/i5-2400/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "3072 МБ видеопамяти GDDR5",
    "category": "videocards",
    "title": "Видеокарта GTX 660 TI",
    "longtitle": "Видеокарта GTX 660 TI",
    "itemurl": "http://digdi.ru/product/gtx-660-ti/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "объем модуля 8 ГБ",
    "category": "memory",
    "title": "Оперативная память DDR3 8GB",
    "longtitle": "Оперативная память DDR3 8GB",
    "itemurl": "http://digdi.ru/product/ddr3-8gb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "объем модуля 4 ГБ",
    "category": "memory",
    "title": "Оперативная память DDR3 4GB",
    "longtitle": "Оперативная память DDR3 4GB",
    "itemurl": "http://digdi.ru/product/ddr3-4gb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "объем модуля 2 ГБ",
    "category": "memory",
    "title": "Оперативная память DDR3 2GB",
    "longtitle": "Оперативная память DDR3 2GB",
    "itemurl": "http://digdi.ru/product/ddr3-2gb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  },
  {
    "decription": "объем модуля 2 ГБ",
    "category": "memory",
    "title": "Оперативная память DDR2 2GB",
    "longtitle": "Оперативная память DDR2 2GB",
    "itemurl": "http://digdi.ru/product/ddr2-2gb/",
    "price": 0,
    "image": "http://digdi.ru/wp-content/uploads/2018/07/монитор-19-wide.jpg",
    "externalurl": ""
  }
  ];

// добавление элемента каталога
// получает на вход массив объектов
// data.map(item => {
//   const catalogItem = new CatalogItemsDashboard(item);
//   catalogItem.save()
//     .catch(err => console.log('save error', err));
// });

// добавление категории
// получает на вход массив объектов
// categories.map(item => {
//   const categoryItem = new Category(item);
//   categoryItem.save()
//     .catch(err => console.log('save category error', err));
// });

Catalog.deleteOne({ _id: '5c6e51514446d67abefda1d2' })
  .then(result => console.log(result.deletedCount))
  .catch(err=> {
    console.log(err);
  });
