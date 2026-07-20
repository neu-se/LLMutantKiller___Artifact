let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return timezones for a valid country (US)', function(done) {
        const timezones = countries_and_timezones.getTimezonesForCountry('US');
        
        assert(timezones !== null, 'Timezones should not be null');
        assert(Array.isArray(timezones), 'Timezones should be an array');
        assert(timezones.length > 0, 'US should have at least one timezone');
        
        // Check that some expected US timezones exist by looking at timezone names
        const timezoneNames = timezones.map(tz => tz.name);
        assert(timezoneNames.includes('America/New_York'), 'US should include America/New_York timezone');
        assert(timezoneNames.includes('America/Los_Angeles'), 'US should include America/Los_Angeles timezone');
        
        done();
    });
});