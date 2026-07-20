let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getCountry with another valid country code', function(done) {
        // Test with another known valid country code
        let country = countries_and_timezones.getCountry('GB');
        
        assert(country !== null, 'Country should not be null');
        assert(country !== undefined, 'Country should not be undefined');
        assert.strictEqual(country.id, 'GB', 'Country ID should match');
        assert.strictEqual(country.name, 'United Kingdom', 'Country name should be United Kingdom');
        assert(Array.isArray(country.timezones), 'Timezones should be an array');
        
        done();
    });

    })