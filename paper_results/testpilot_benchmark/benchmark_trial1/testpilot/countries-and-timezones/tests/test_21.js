let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return timezone objects with correct properties', function(done) {
        const timezones = countries_and_timezones.getTimezonesForCountry('JP');
        
        assert(Object.keys(timezones).length > 0, 'Japan should have timezones');
        
        // Check the structure of timezone objects
        const timezoneKeys = Object.keys(timezones);
        const firstTimezone = timezones[timezoneKeys[0]];
        
        assert(typeof firstTimezone === 'object', 'Timezone should be an object');
        assert('name' in firstTimezone, 'Timezone should have name property');
        assert('utcOffset' in firstTimezone, 'Timezone should have utcOffset property');
        
        done();
    });
});