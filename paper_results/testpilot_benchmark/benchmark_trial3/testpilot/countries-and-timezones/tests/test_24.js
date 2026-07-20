let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return timezones for a valid country (GB)', function() {
        const timezones = countries_and_timezones.getTimezonesForCountry('GB');
        
        assert(timezones !== null, 'Timezones should not be null');
        assert(typeof timezones === 'object', 'Timezones should be an object');
        
        // Check if timezones is an array or object and adjust the assertion
        if (Array.isArray(timezones)) {
            // If it's an array, check if it contains the timezone
            const hasLondonTimezone = timezones.some(tz => 
                (typeof tz === 'string' && tz === 'Europe/London') ||
                (typeof tz === 'object' && tz.name === 'Europe/London')
            );
            assert(hasLondonTimezone, 'Should contain Europe/London timezone');
        } else {
            // If it's an object, check if the key exists or if any value contains Europe/London
            const hasLondonTimezone = 'Europe/London' in timezones || 
                Object.values(timezones).some(tz => 
                    (typeof tz === 'string' && tz === 'Europe/London') ||
                    (typeof tz === 'object' && tz.name === 'Europe/London')
                );
            assert(hasLondonTimezone, 'Should contain Europe/London timezone');
        }
    });
});