'use strict';

const kabupatenList = [
  'Cilacap',
  'Banyumas',
  'Purbalingga',
  'Banjarnegara',
  'Kebumen',
  'Purworejo',
  'Wonosobo',
  'Magelang',
  'Boyolali',
  'Klaten',
  'Sukoharjo',
  'Wonogiri',
  'Karanganyar',
  'Sragen',
  'Grobogan',
  'Blora',
  'Rembang',
  'Pati',
  'Kudus',
  'Jepara',
  'Demak',
  'Semarang',
  'Temanggung',
  'Kendal',
  'Batang',
  'Pekalongan',
  'Pemalang',
  'Tegal',
  'Brebes'
];

module.exports = {
  async up(queryInterface, Sequelize) {
const farmers = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE role = 'farmer'`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const updates = farmers.map(farmer => {
      const randomKabupaten = kabupatenList[Math.floor(Math.random() * kabupatenList.length)];
      return queryInterface.bulkUpdate('Users', 
        { location: randomKabupaten },
        { id: farmer.id }
      );
    });

    return Promise.all(updates);
  },

  async down(queryInterface, Sequelize) {
return queryInterface.sequelize.query(
      `UPDATE "Users" SET location = NULL WHERE role = 'farmer'`
    );
  }
};

