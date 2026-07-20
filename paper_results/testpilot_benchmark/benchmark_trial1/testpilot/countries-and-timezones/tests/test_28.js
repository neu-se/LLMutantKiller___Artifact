let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return timezones for a valid country (US)', function(done) {
        const timezones = countries_and_timezones.getTimezonesForCountry('US');
        
        assert(timezones !== null, 'Timezones should not be null');
        assert(typeof timezones === 'object', 'Timezones should be an object');
        assert(Object.keys(timezones).length > 0, 'US should have at least one timezone');
        
        // Check that some expected US timezones exist - using the correct timezone identifiers
        const timezoneKeys = Object.keys(timezones);
        const hasEasternTimezone = timezoneKeys.some(tz => tz.includes('New_York') || tz.includes('Eastern'));
        const hasPacificTimezone = timezoneKeys.some(tz => tz.includes('Los_Angeles') || tz.includes('Pacific'));
        
        assert(hasEasternTimezone, 'US should include an Eastern timezone (New_York related)');
        assert(hasPacificTimezone, 'US should include a Pacific timezone (Los_Angeles related)');
        
        done();
    });
});