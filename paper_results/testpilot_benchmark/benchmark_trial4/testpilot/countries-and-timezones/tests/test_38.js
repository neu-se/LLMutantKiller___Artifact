let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return countries for valid timezone America/New_York', function(done) {
        const result = countries_and_timezones.getCountriesForTimezone('America/New_York');
        assert(result !== null, 'Result should not be null');
        assert(typeof result === 'object', 'Result should be an object');
        
        // Check if result is an array or object and verify US is included
        if (Array.isArray(result)) {
            const hasUS = result.some(country => country.id === 'US' || country.name === 'United States');
            assert(hasUS, 'Should include United States');
        } else {
            // If it's an object, check for US property or find US in the values
            const hasUS = result.US !== undefined || 
                         Object.values(result).some(country => 
                             country && (country.id === 'US' || country.name === 'United States')
                         );
            assert(hasUS, 'Should include United States');
        }
        
        done();
    });
});