let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getCountryForTimezone with valid timezone', function(done) {
        // Test with a well-known timezone
        let result = countries_and_timezones.getCountryForTimezone('America/New_York');
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result.id, 'US');
        assert.strictEqual(result.name, 'United States of America');
        done();
    });

    })