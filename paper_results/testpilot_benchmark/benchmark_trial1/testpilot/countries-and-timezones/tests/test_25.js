let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should handle null/undefined input gracefully', function(done) {
        // Test that null input throws an error or returns empty object
        try {
            const timezonesNull = countries_and_timezones.getTimezonesForCountry(null);
            assert(typeof timezonesNull === 'object', 'Null input should return object');
            assert(Object.keys(timezonesNull).length === 0, 'Null input should return empty object');
        } catch (error) {
            // If it throws an error, that's also acceptable behavior for invalid input
            assert(error.message.includes('Cannot convert undefined or null to object') || 
                   error.message.includes('null') || 
                   error.message.includes('undefined'), 
                   'Should throw appropriate error for null input');
        }
        
        // Test that undefined input throws an error or returns empty object
        try {
            const timezonesUndefined = countries_and_timezones.getTimezonesForCountry(undefined);
            assert(typeof timezonesUndefined === 'object', 'Undefined input should return object');
            assert(Object.keys(timezonesUndefined).length === 0, 'Undefined input should return empty object');
        } catch (error) {
            // If it throws an error, that's also acceptable behavior for invalid input
            assert(error.message.includes('Cannot convert undefined or null to object') || 
                   error.message.includes('null') || 
                   error.message.includes('undefined'), 
                   'Should throw appropriate error for undefined input');
        }
        
        done();
    });
});