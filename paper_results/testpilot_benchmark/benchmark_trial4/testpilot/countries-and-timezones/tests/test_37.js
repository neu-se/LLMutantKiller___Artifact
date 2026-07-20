let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return countries for valid timezone Europe/London', function(done) {
        const result = countries_and_timezones.getCountriesForTimezone('Europe/London');
        assert(result !== null, 'Result should not be null');
        assert(typeof result === 'object', 'Result should be an object');
        
        // Check if result is an array or object and handle accordingly
        if (Array.isArray(result)) {
            assert(result.length > 0, 'Should return at least one country');
            const hasGB = result.some(country => country.id === 'GB' || country.code === 'GB');
            assert(hasGB, 'Should include Great Britain');
        } else {
            // If it's an object, check for GB property or look for UK as alternative
            const hasGB = result.GB !== undefined || result.UK !== undefined;
            assert(hasGB, 'Should include Great Britain (GB) or United Kingdom (UK)');
        }
        
        done();
    });
});