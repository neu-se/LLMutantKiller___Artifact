let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getCountryForTimezone with another valid timezone', function(done) {
        // Test with London timezone
        let result = countries_and_timezones.getCountryForTimezone('Europe/London');
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result.id, 'GB');
        assert.strictEqual(result.name, 'United Kingdom');
        done();
    });

    })