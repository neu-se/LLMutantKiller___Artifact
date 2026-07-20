let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getTimezone with valid timezone', function(done) {
        const timezone = countries_and_timezones.getTimezone('America/Los_Angeles');
        
        assert.strictEqual(timezone.name, 'America/Los_Angeles');
        assert(Array.isArray(timezone.countries));
        assert(timezone.countries.includes('US'));
        assert.strictEqual(typeof timezone.utcOffset, 'number');
        assert.strictEqual(typeof timezone.utcOffsetStr, 'string');
        assert.strictEqual(typeof timezone.dstOffset, 'number');
        assert.strictEqual(typeof timezone.dstOffsetStr, 'string');
        assert(timezone.aliasOf === null || typeof timezone.aliasOf === 'string');
        
        done();
    });

    })