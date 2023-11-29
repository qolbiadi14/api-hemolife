'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Tambah tabel gol_darah
		await queryInterface.createTable('gol_darah', {
			id_gol_darah: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
			},
			gol_darah: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					isIn: [['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']],
				},
			},
		});

		// Tambah tabel user
		await queryInterface.createTable('user', {
			id_user: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
			},
			id_gol_darah: {
				type: Sequelize.STRING,
				references: {
					model: 'gol_darah',
					key: 'id_gol_darah',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			nama: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			no_hp: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			jenis_kelamin: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					isIn: [['Laki-laki', 'Perempuan']],
				},
			},
			tanggal_lahir: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			alamat: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});

		// Tambah tabel volunteer
		await queryInterface.createTable('volunteer', {
			id_volunteer: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
			},
			id_gol_darah: {
				type: Sequelize.STRING,
				references: {
					model: 'gol_darah',
					key: 'id_gol_darah',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			nama: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			no_hp: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			jenis_kelamin: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					isIn: [['Laki-laki', 'Perempuan']],
				},
			},
			alamat: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			status: {
				type: Sequelize.TINYINT,
				defaultValue: 0,
				allowNull: false,
			},
		});

		// Tambah tabel lokasi_pmi
		await queryInterface.createTable('lokasi_pmi', {
			id_lokasi_pmi: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
			},
			nama: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			no_telpon: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			alamat: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			latitude: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			longitude: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			logo: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});

		// Tambah tabel jadwal
		await queryInterface.createTable('jadwal', {
			id_jadwal: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
			},
			id_lokasi_pmi: {
				type: Sequelize.STRING,
				references: {
					model: 'lokasi_pmi',
					key: 'id_lokasi_pmi',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			jadwal_hari: {
				type: Sequelize.TIME,
				allowNull: false,
			},
			jadwal_jam_mulai: {
				type: Sequelize.TIME,
				allowNull: false,
			},
		});

		// Tambah tabel bank_darah
		await queryInterface.createTable('bank_darah', {
			id_bank_darah: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
			},
			id_lokasi_pmi: {
				type: Sequelize.STRING,
				references: {
					model: 'lokasi_pmi',
					key: 'id_lokasi_pmi',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			id_gol_darah: {
				type: Sequelize.STRING,
				references: {
					model: 'gol_darah',
					key: 'id_gol_darah',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			jumlah_kantong_darah: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		});

		// Tambah tabel admin
		await queryInterface.createTable('admin', {
			id_admin: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
			},
			nama: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});

		// Tambah tabel tra_donor
		await queryInterface.createTable('tra_donor', {
			id_tra_donor: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			id_user: {
				type: Sequelize.STRING,
				references: {
					model: 'user',
					key: 'id_user',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			id_gol_darah: {
				type: Sequelize.STRING,
				references: {
					model: 'gol_darah',
					key: 'id_gol_darah',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			id_lokasi_pmi: {
				type: Sequelize.STRING,
				references: {
					model: 'lokasi_pmi',
					key: 'id_lokasi_pmi',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			tgl_donor: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			status: {
				type: Sequelize.TINYINT,
				allowNull: false,
			},
		});

		// Tambah tabel tra_req_darah
		await queryInterface.createTable('tra_req_darah', {
			tra_req_darah: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			id_user_req: {
				type: Sequelize.STRING,
				references: {
					model: 'user',
					key: 'id_user',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			id_user_volunteer: {
				type: Sequelize.STRING,
				references: {
					model: 'volunteer',
					key: 'id_volunteer',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			id_lokasi_pmi: {
				type: Sequelize.STRING,
				references: {
					model: 'lokasi_pmi',
					key: 'id_lokasi_pmi',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			tgl_req_darah: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			status: {
				type: Sequelize.TINYINT,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('gol_darah');
		await queryInterface.dropTable('user');
		await queryInterface.dropTable('volunteer');
		await queryInterface.dropTable('lokasi_pmi');
		await queryInterface.dropTable('jadwal');
		await queryInterface.dropTable('bank_darah');
		await queryInterface.dropTable('admin');
		await queryInterface.dropTable('tra_donor');
		await queryInterface.dropTable('tra_req_darah');
	},
};
