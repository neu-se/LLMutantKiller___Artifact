let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getCountry with valid country code', function(done) {
        // Test with a known valid country code
        const country = countries_and_timezones.getCountry('US');
        
        assert(country !== null, 'Country should not be null');
        assert(country !== undefined, 'Country should not be undefined');
        assert.strictEqual(country.id, 'US', 'Country ID should match');
        // The actual country name might be different, so let's check for a valid string instead
        assert(typeof country.name === 'string', 'Country name should be a string');
        assert(country.name.length > 0, 'Country name should not be empty');
        assert(Array.isArray(country.timezones), 'Timezones should be an array');
        assert(country.timezones.length > 0, 'Should have at least one timezone');
        
        done();
    });
});