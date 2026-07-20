let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return timezones for a valid country (US)', function() {
        const timezones = countries_and_timezones.getTimezonesForCountry('US');
        
        assert(timezones !== null, 'Timezones should not be null');
        assert(typeof timezones === 'object', 'Timezones should be an object');
        assert(Object.keys(timezones).length > 0, 'US should have at least one timezone');
        
        // Check that some expected US timezones exist
        assert('America/New_York' in timezones, 'Should contain America/New_York timezone');
        assert('America/Los_Angeles' in timezones, 'Should contain America/Los_Angeles timezone');
    });

    })