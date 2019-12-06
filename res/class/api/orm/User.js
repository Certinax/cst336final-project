require('dotenv').config();
const mysql = require('../../mysql/MySQL');
const mysqlCredentials = require('../../mysql/MysqlCredentials');

const db = mysql.getInstance(new mysqlCredentials(
	process.env.DB_HOST,
	process.env.DB_USER,
	process.env.DB_PASS,
	process.env.DB_NAME
));

/**
 * User
 * @author Isak Hauge
 */
class User {

	/**
	 * Constructor
	 * @param {string} name
	 * @param {string} surname
	 * @param {string} email
	 * @param {string} password
	 */
	constructor(name, surname, email, password) {

		/**@type{string}*/
		this._name = name;

		/**@type{string}*/
		this._surname = surname;

		/**@type{string}*/
		this._email = email;

		/**@type{string}*/
		this._password = password;
	}


	/**
	 * Getter: Name
	 * @returns {string}
	 */
	getName() {
		return this._name;
	}


	/**
	 * Setter: Name
	 * @param {string} name
	 * @returns {User}
	 */
	setName(name) {
		this._name = name;
		return this;
	}


	/**
	 * Getter: Surname
	 * @returns {string}
	 */
	getSurname() {
		return this._surname;
	}


	/**
	 * Setter: Surname
	 * @param {string} surname
	 * @returns {User}
	 */
	setSurname(surname) {
		this._surname = surname;
		return this;
	}


	/**
	 * Getter: Email
	 * @returns {string}
	 */
	getEmail() {
		return this._email;
	}


	/**
	 * Setter: Email
	 * @param {string} email
	 * @returns {User}
	 */
	setEmail(email) {
		this._email = email;
		return this;
	}


	/**
	 * Getter: Password
	 * @returns {string}
	 */
	getPassword() {
		return this._password;
	}


	/**
	 * Setter: Password
	 * @param {string} password
	 * @returns {User}
	 */
	setPassword(password) {
		this._password = password;
		return this;
	}


	/**
	 * Fetch
	 * @param email
	 * @param {function} callback
	 * @example
	 * fetch(1, (user) => {
	 *   console.log(user.getName())
	 * });
	 */
	static fetch(email, callback) {

		// Define SQL query.
		const sql = 'SELECT * FROM User WHERE email = ?;';

		// Execute query.
		db.prep(sql, [email])
		.then((resolved) => {
			// ? If the resolved value is an array.
			if (Array.isArray(resolved)) {
				// ? If the query returned any results.
				if (resolved.length > 0) {
					callback(resolved);
				} else {
					console.error(
						`MySQL: User with email (${email}) does not exist.`
					);
					callback([]);
				}
			} else callback([]);
		}).catch(err => {
			callback([]);
		});
	}


	/**
	 * Fetch All
	 * @param {function} callback
	 */
	static fetchAll(callback) {
		const sql = 'SELECT * FROM User;';
		db.query(sql)
		.then((resolved) => {
			if (typeof resolved === 'object')
				callback(resolved);
		}).catch(err => {
			callback([]);
		});
	}


	/**
	 * Create
	 * @param {object} args
	 * @param {string} args.name
	 * @param {string} args.surname
	 * @param {string} args.email
	 * @param {string} args.password
	 * @param {function} callback
	 */
	static create({name, surname, email, password}, callback) {
		const sql = `CALL new_user("${name}","${surname}","${email}","${password}",@out); SELECT @out;`;
		db.query(sql)
		.then(res => {
			callback(res);
		}).catch(err => {
			callback([]);
		});
	}


	/**
	 * Edit
	 * @param {object} args
	 * @param {string} args.name
	 * @param {string} args.surname
	 * @param {string} args.email
	 * @param {string} args.password
	 * @param {function} callback
	 */
	static edit({name, surname, email, password}, callback) {
		const sql = `CALL edit_user("${name}","${surname}","${email}","${password}",@out); SELECT @out;`;
		db.query(sql)
		.then(res => {
			callback(res);
		}).catch(err => {
			callback([]);
		});
	}


	/**
	 * Delete
	 * @param {object} credentials
	 * @param {string} credentials.email
	 * @param {string} credentials.password
	 * @param {function} callback
	 */
	static delete({email, password}, callback) {
		const sql = `CALL delete_user("${email}","${password}",@out); SELECT @out;`;
		db.query(sql)
		.then(res => {
			callback(res);
		}).catch(err => {
			callback([]);
		});
	}
}

module.exports = User;