let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getTimezone with valid timezone', function(done) {
        // Test with a well-known timezone
        const timezone = countries_and_timezones.getTimezone('America/New_York');
        
        assert(timezone !== null, 'Timezone should not be null');
        assert(timezone !== undefined, 'Timezone should not be undefined');
        assert.strictEqual(timezone.name, 'America/New_York');
        assert(timezone.hasOwnProperty('utcOffset'), 'Timezone should have utcOffset property');
        assert(timezone.hasOwnProperty('utcOffsetStr'), 'Timezone should have utcOffsetStr property');
        assert(timezone.hasOwnProperty('dstOffset'), 'Timezone should have dstOffset property');
        assert(timezone.hasOwnProperty('dstOffsetStr'), 'Timezone should have dstOffsetStr property');
        assert(timezone.hasOwnProperty('aliasOf'), 'Timezone should have aliasOf property');
        assert(Array.isArray(timezone.countries), 'Countries should be an array');
        
        done();
    });

    })