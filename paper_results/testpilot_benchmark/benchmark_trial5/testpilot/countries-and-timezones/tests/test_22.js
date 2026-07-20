let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getTimezonesForCountry with valid country code', function(done) {
        const timezones = countries_and_timezones.getTimezonesForCountry('US');
        
        assert(Array.isArray(timezones), 'Should return an array');
        assert(timezones.length > 0, 'Should return at least one timezone for US');
        
        // Check structure of first timezone object
        const firstTimezone = timezones[0];
        assert(typeof firstTimezone.name === 'string', 'Timezone should have a name property');
        assert(Array.isArray(firstTimezone.countries), 'Timezone should have countries array');
        assert(firstTimezone.countries.includes('US'), 'Timezone should include US in countries');
        assert(typeof firstTimezone.utcOffset === 'number', 'Timezone should have utcOffset number');
        assert(typeof firstTimezone.utcOffsetStr === 'string', 'Timezone should have utcOffsetStr string');
        
        done();
    });

    })