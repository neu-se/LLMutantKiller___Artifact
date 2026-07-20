let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return timezones for a valid country (GB)', function() {
        const timezones = countries_and_timezones.getTimezonesForCountry('GB');
        
        assert(timezones !== null, 'Timezones should not be null');
        assert(typeof timezones === 'object', 'Timezones should be an object');
        
        // Check if timezones is an array or object and handle accordingly
        if (Array.isArray(timezones)) {
            assert(timezones.length > 0, 'Should have at least one timezone');
            const hasLondonTimezone = timezones.some(tz => 
                (typeof tz === 'string' && tz === 'Europe/London') ||
                (typeof tz === 'object' && tz.name === 'Europe/London')
            );
            assert(hasLondonTimezone, 'Should contain Europe/London timezone');
        } else {
            // If it's an object, check for the key
            const timezoneKeys = Object.keys(timezones);
            assert(timezoneKeys.length > 0, 'Should have at least one timezone');
            assert('Europe/London' in timezones, 'Should contain Europe/London timezone');
        }
    });
});