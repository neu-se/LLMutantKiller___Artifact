let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    describe('getTimezone', function() {
        it('should return a timezone object for valid timezone name', function() {
            const timezone = countries_and_timezones.getTimezone('America/New_York');
            
            assert.strictEqual(typeof timezone, 'object');
            assert.strictEqual(timezone.name, 'America/New_York');
            assert.strictEqual(typeof timezone.utcOffset, 'number');
            assert.strictEqual(typeof timezone.utcOffsetStr, 'string');
            assert.strictEqual(typeof timezone.dstOffset, 'number');
            assert.strictEqual(typeof timezone.dstOffsetStr, 'string');
            assert.strictEqual(Array.isArray(timezone.aliasOf), true);
            assert.strictEqual(Array.isArray(timezone.countries), true);
        });

            })
})