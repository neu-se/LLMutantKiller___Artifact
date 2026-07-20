let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return a valid country object for existing country ID', function() {
        const country = countries_and_timezones.getCountry('US');
        
        assert(country !== null, 'Country should not be null');
        assert(country !== undefined, 'Country should not be undefined');
        assert.strictEqual(country.id, 'US', 'Country ID should match');
        assert(typeof country.name === 'string', 'Country name should be a string');
        assert(Array.isArray(country.timezones), 'Timezones should be an array');
    });

    })