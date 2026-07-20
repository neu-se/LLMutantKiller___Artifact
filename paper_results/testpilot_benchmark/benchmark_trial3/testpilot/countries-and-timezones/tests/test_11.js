let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getAllCountries returns an object', function(done) {
        const result = countries_and_timezones.getAllCountries();
        assert(typeof result === 'object', 'getAllCountries should return an object');
        assert(result !== null, 'getAllCountries should not return null');
        done();
    });

    })