let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return timezone objects with correct properties', function(done) {
        const timezones = countries_and_timezones.getTimezonesForCountry('FR');
        
        assert(Object.keys(timezones).length > 0, 'France should have timezones');
        
        // Check the structure of timezone objects
        const timezoneKeys = Object.keys(timezones);
        const firstTimezone = timezones[timezoneKeys[0]];
        
        assert(typeof firstTimezone === 'object', 'Timezone should be an object');
        assert(typeof firstTimezone.name === 'string', 'Timezone should have a name property');
        assert(Array.isArray(firstTimezone.countries), 'Timezone should have countries array');
        
        done();
    });
});