let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getCountriesForTimezone with valid timezone', function(done) {
        const countries = countries_and_timezones.getCountriesForTimezone('Europe/Zurich');
        
        // Should return an array
        assert(Array.isArray(countries), 'Should return an array');
        
        // Should contain at least one country
        assert(countries.length > 0, 'Should return at least one country');
        
        // Each country should have required properties
        countries.forEach(country => {
            assert(typeof country.id === 'string', 'Country should have an id');
            assert(typeof country.name === 'string', 'Country should have a name');
            assert(Array.isArray(country.timezones), 'Country should have timezones array');
            assert(country.timezones.includes('Europe/Zurich'), 'Country should include the queried timezone');
        });
        
        done();
    });

    })