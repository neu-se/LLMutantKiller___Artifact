let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getCountryForTimezone with valid timezone', function(done) {
        // Test with a well-known timezone that should return a country
        const result = countries_and_timezones.getCountryForTimezone('America/New_York');
        assert.notStrictEqual(result, null, 'Should return a country object for valid timezone');
        assert.strictEqual(typeof result, 'object', 'Result should be an object');
        done();
    });

    })