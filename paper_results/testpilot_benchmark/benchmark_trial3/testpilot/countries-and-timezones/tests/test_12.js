let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getAllCountries returns object', function(done) {
        const countries = countries_and_timezones.getAllCountries();
        
        // Test that the result is an object
        assert.strictEqual(typeof countries, 'object');
        assert.strictEqual(countries !== null, true);
        
        done();
    });

    })