"use strict";
require('dotenv').config();
// @ts-ignore
var mysql = require('../../mysql/MySQL');
// @ts-ignore
var mysqlCredentials = require('../../mysql/MysqlCredentials');
// @ts-ignore
var db = mysql.getInstance(new mysqlCredentials(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME));
var Chore = /** @class */ (function () {
    function Chore() {
    }
    // * Get all Chores.
    Chore.fetchAll = function (callback) {
        var sql = "SELECT * FROM `" + Chore.Table.name + "`;";
        db.query(sql).then(function (resolved) {
            callback(resolved);
        }).catch(function (error) {
            callback(error);
        });
    };
    // * Get specific Chore.
    Chore.fetch = function (id, callback) {
        var sql = "SELECT * FROM `" + Chore.Table.name + "` WHERE `" + Chore.Table.column.id + "` = ?;";
        db.prep(sql, [id]).then(function (resolved) {
            callback(resolved);
        });
    };
    // * Create Chore
    Chore.create = function (collectionName, title, description, startDate, frequency, callback) {
        var sql = "CALL new_chore(\"" + collectionName + "\", \"" + title + "\", \"" + description + "\", DATE(\"" + startDate + "\"), " + frequency + ", @out); SELECT @out;";
        db.query(sql).then(function (resolved) {
            callback(resolved);
        }).catch(function (error) {
            callback(error);
        });
    };
    // * Edit Chore
    Chore.edit = function (collectionName, title, description, frequency, callback) {
        var sql = "CALL edit_chore(\"" + collectionName + "\", \"" + title + "\", \"" + description + "\", " + frequency + ", @out); SELECT @out;";
        db.query(sql).then(function (resolved) {
            callback(resolved);
        }).catch(function (error) {
            callback(error);
        });
    };
    // * Delete Chore
    Chore.delete = function (collectiveName, title, password, callback) {
        var sql = "CALL delete_chore(\"" + collectiveName + "\", \"" + title + "\", \"" + password + "\", @out); SELECT @out";
        db.query(sql).then(function (resolved) {
            callback(resolved);
        }).catch(function (error) {
            callback(error);
        });
    };
    Chore.Table = {
        name: 'Chore',
        column: {
            id: 'ID',
            title: 'title',
            description: 'description',
            collectiveId: 'collective_ID',
            status: 'status',
            startDate: 'start_date',
            frequency: 'frequency'
        }
    };
    return Chore;
}());
module.exports = Chore;
