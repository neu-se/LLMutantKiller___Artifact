let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getTimezonesForCountry with valid country', function(done) {
        // Test with Mexico (MX) - a country with multiple timezones
        const timezones = countries_and_timezones.getTimezonesForCountry('MX');
        
        assert(timezones !== null, 'Should return timezones for valid country');
        assert(Array.isArray(timezones), 'Should return an array');
        assert(timezones.length > 0, 'Should return at least one timezone');
        
        // Check structure of first timezone object
        const firstTimezone = timezones[0];
        assert(typeof firstTimezone.name === 'string', 'Timezone should have a name');
        assert(Array.isArray(firstTimezone.countries), 'Timezone should have countries array');
        assert(firstTimezone.countries.includes('MX'), 'Timezone should include MX in countries');
        assert(typeof firstTimezone.utcOffset === 'number', 'Timezone should have utcOffset');
        assert(typeof firstTimezone.utcOffsetStr === 'string', 'Timezone should have utcOffsetStr');
        
        done();
    });

    })