let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return countries for valid timezone Asia/Tokyo', function(done) {
        const result = countries_and_timezones.getCountriesForTimezone('Asia/Tokyo');
        assert(result !== null, 'Result should not be null');
        assert(typeof result === 'object', 'Result should be an object');
        
        // Check if result is an array and contains Japan
        if (Array.isArray(result)) {
            const hasJapan = result.some(country => country.id === 'JP' || country.name === 'Japan');
            assert(hasJapan, 'Should include Japan');
        } else {
            // If it's an object, check for JP key
            assert(result.JP !== undefined, 'Should include Japan');
        }
        
        done();
    });
});