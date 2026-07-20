let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getAllCountries returns object', function(done) {
        const countries = countries_and_timezones.getAllCountries();
        assert(typeof countries === 'object', 'getAllCountries should return an object');
        assert(countries !== null, 'getAllCountries should not return null');
        done();
    });

    })