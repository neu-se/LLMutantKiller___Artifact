let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getCountryForTimezone with valid timezone', function(done) {
        const result = countries_and_timezones.getCountryForTimezone('Europe/Zurich');
        
        assert.strictEqual(result.id, 'CH');
        assert.strictEqual(result.name, 'Switzerland');
        assert(Array.isArray(result.timezones));
        assert(result.timezones.includes('Europe/Zurich'));
        
        done();
    });

    })