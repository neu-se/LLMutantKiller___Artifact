let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getTimezone with valid timezone', function(done) {
        const timezone = countries_and_timezones.getTimezone('America/Los_Angeles');
        
        assert.strictEqual(typeof timezone, 'object');
        assert.strictEqual(timezone.name, 'America/Los_Angeles');
        assert.strictEqual(Array.isArray(timezone.countries), true);
        assert.strictEqual(timezone.countries.includes('US'), true);
        assert.strictEqual(typeof timezone.utcOffset, 'number');
        assert.strictEqual(typeof timezone.utcOffsetStr, 'string');
        assert.strictEqual(typeof timezone.dstOffset, 'number');
        assert.strictEqual(typeof timezone.dstOffsetStr, 'string');
        assert.strictEqual(timezone.utcOffset, -480);
        assert.strictEqual(timezone.utcOffsetStr, '-08:00');
        assert.strictEqual(timezone.dstOffset, -420);
        assert.strictEqual(timezone.dstOffsetStr, '-07:00');
        
        done();
    });

    })