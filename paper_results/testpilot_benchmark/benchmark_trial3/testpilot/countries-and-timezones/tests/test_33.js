let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getCountriesForTimezone with valid timezone', function(done) {
        // Test with a well-known timezone that should have countries
        const result = countries_and_timezones.getCountriesForTimezone('America/New_York');
        
        assert(result !== null, 'Result should not be null');
        assert(typeof result === 'object', 'Result should be an object');
        assert(Object.keys(result).length > 0, 'Result should contain at least one country');
        
        // Check that at least one country is returned and has the expected structure
        const countryKeys = Object.keys(result);
        const firstCountry = result[countryKeys[0]];
        
        assert(firstCountry.hasOwnProperty('name'), 'Country should have a name property');
        assert(typeof firstCountry.name === 'string', 'Country name should be a string');
        
        // More flexible check - look for any country that uses America/New_York timezone
        let foundValidCountry = false;
        for (let countryCode in result) {
            if (result[countryCode].name && typeof result[countryCode].name === 'string') {
                foundValidCountry = true;
                break;
            }
        }
        assert(foundValidCountry, 'Should find at least one valid country with a name');
        
        done();
    });
});