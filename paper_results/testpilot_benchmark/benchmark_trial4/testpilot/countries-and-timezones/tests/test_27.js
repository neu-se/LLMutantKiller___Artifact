let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return timezones for a valid country (GB)', function(done) {
        const timezones = countries_and_timezones.getTimezonesForCountry('GB');
        
        assert(timezones !== null, 'Timezones should not be null');
        assert(Array.isArray(timezones), 'Timezones should be an array');
        assert(timezones.length > 0, 'Timezones array should not be empty');
        
        // Check if Europe/London timezone exists in the array
        const hasLondonTimezone = timezones.some(tz => tz.name === 'Europe/London');
        assert(hasLondonTimezone, 'GB should include Europe/London timezone');
        
        done();
    });
});