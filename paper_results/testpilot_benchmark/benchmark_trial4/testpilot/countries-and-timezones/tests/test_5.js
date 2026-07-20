let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getCountry with valid country code', function(done) {
        const country = countries_and_timezones.getCountry('DE');
        
        assert.strictEqual(country.id, 'DE');
        assert.strictEqual(country.name, 'Germany');
        assert(Array.isArray(country.timezones));
        assert(country.timezones.length > 0);
        assert(country.timezones.includes('Europe/Berlin'));
        
        done();
    });

    })