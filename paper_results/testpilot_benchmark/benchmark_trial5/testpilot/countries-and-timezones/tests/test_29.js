let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return countries for a valid timezone', function() {
        const result = countries_and_timezones.getCountriesForTimezone('America/New_York');
        assert(Array.isArray(result), 'Result should be an array');
        assert(result.length > 0, 'Should return at least one country');
        // Check that each item in the array has country properties
        result.forEach(country => {
            assert(typeof country === 'object', 'Each country should be an object');
            assert(typeof country.id === 'string', 'Country should have an id');
        });
    });

    })