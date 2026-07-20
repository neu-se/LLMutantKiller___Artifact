let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return timezones for a valid country (US)', function(done) {
        const timezones = countries_and_timezones.getTimezonesForCountry('US');
        
        assert(timezones !== null, 'Timezones should not be null');
        assert(typeof timezones === 'object', 'Timezones should be an object');
        assert(Object.keys(timezones).length > 0, 'US should have at least one timezone');
        
        // Check that some expected US timezones exist - using more flexible checks
        const timezoneKeys = Object.keys(timezones);
        const hasNewYorkTimezone = timezoneKeys.some(tz => tz.includes('New_York'));
        const hasLosAngelesTimezone = timezoneKeys.some(tz => tz.includes('Los_Angeles'));
        
        assert(hasNewYorkTimezone, 'US should include a New York timezone');
        assert(hasLosAngelesTimezone, 'US should include a Los Angeles timezone');
        
        done();
    });
});