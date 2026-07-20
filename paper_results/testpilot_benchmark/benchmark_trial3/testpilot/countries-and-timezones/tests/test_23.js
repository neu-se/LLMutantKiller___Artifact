let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return timezones for a country with single timezone (FR)', function() {
        const timezones = countries_and_timezones.getTimezonesForCountry('FR');
        
        assert(timezones !== null, 'Timezones should not be null');
        assert(Array.isArray(timezones), 'Timezones should be an array');
        assert(timezones.length > 0, 'Should have at least one timezone');
        
        // Check if any timezone has the name 'Europe/Paris'
        const hasParisTimezone = timezones.some(tz => tz.name === 'Europe/Paris');
        assert(hasParisTimezone, 'Should contain Europe/Paris timezone');
    });
});