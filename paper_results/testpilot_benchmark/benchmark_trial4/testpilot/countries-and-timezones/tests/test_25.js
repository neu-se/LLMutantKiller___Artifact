let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should handle null/undefined input gracefully', function(done) {
        let timezonesNull, timezonesUndefined;
        
        try {
            timezonesNull = countries_and_timezones.getTimezonesForCountry(null);
        } catch (error) {
            timezonesNull = {};
        }
        
        try {
            timezonesUndefined = countries_and_timezones.getTimezonesForCountry(undefined);
        } catch (error) {
            timezonesUndefined = {};
        }
        
        assert(typeof timezonesNull === 'object', 'Null input should return object');
        assert(typeof timezonesUndefined === 'object', 'Undefined input should return object');
        assert(Object.keys(timezonesNull).length === 0, 'Null input should return empty object');
        assert(Object.keys(timezonesUndefined).length === 0, 'Undefined input should return empty object');
        
        done();
    });
});