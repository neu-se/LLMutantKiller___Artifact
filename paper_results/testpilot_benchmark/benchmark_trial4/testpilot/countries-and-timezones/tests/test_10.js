let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getTimezone with valid timezone', function(done) {
        const timezone = countries_and_timezones.getTimezone('America/Los_Angeles');
        
        assert.strictEqual(timezone.name, 'America/Los_Angeles');
        assert(Array.isArray(timezone.countries));
        assert(timezone.countries.includes('US'));
        assert.strictEqual(timezone.utcOffset, -480);
        assert.strictEqual(timezone.utcOffsetStr, '-08:00');
        assert.strictEqual(timezone.dstOffset, -420);
        assert.strictEqual(timezone.dstOffsetStr, '-07:00');
        assert.strictEqual(timezone.aliasOf, null);
        
        done();
    });

    })