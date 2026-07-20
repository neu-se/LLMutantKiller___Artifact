let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getCountriesForTimezone with valid timezone', function(done) {
        const result = countries_and_timezones.getCountriesForTimezone('Europe/Zurich');
        
        assert(Array.isArray(result), 'Result should be an array');
        assert(result.length > 0, 'Result should contain at least one country');
        
        // Check that Switzerland is in the results
        const switzerland = result.find(country => country.id === 'CH');
        assert(switzerland, 'Switzerland should be in the results');
        assert.strictEqual(switzerland.name, 'Switzerland');
        assert(Array.isArray(switzerland.timezones), 'Country should have timezones array');
        assert(switzerland.timezones.includes('Europe/Zurich'), 'Switzerland should include Europe/Zurich timezone');
        
        done();
    });

    })