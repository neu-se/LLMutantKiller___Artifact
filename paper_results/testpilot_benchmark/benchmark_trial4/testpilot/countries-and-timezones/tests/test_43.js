let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getCountryForTimezone', function(done) {
        // Test with valid timezone - Europe/Zurich should return Switzerland
        let result = countries_and_timezones.getCountryForTimezone('Europe/Zurich');
        assert.strictEqual(result.id, 'CH');
        assert.strictEqual(result.name, 'Switzerland');
        assert(Array.isArray(result.timezones));
        assert(result.timezones.includes('Europe/Zurich'));

        // Test with another valid timezone - America/New_York should return United States
        result = countries_and_timezones.getCountryForTimezone('America/New_York');
        assert.strictEqual(result.id, 'US');
        assert.strictEqual(result.name, 'United States');
        assert(Array.isArray(result.timezones));
        assert(result.timezones.includes('America/New_York'));

        // Test with valid timezone - Asia/Tokyo should return Japan
        result = countries_and_timezones.getCountryForTimezone('Asia/Tokyo');
        assert.strictEqual(result.id, 'JP');
        assert.strictEqual(result.name, 'Japan');
        assert(Array.isArray(result.timezones));
        assert(result.timezones.includes('Asia/Tokyo'));

        // Test with invalid/non-existent timezone should return null
        result = countries_and_timezones.getCountryForTimezone('Invalid/Timezone');
        assert.strictEqual(result, null);

        // Test with empty string should return null
        result = countries_and_timezones.getCountryForTimezone('');
        assert.strictEqual(result, null);

        // Test with null input should return null
        result = countries_and_timezones.getCountryForTimezone(null);
        assert.strictEqual(result, null);

        // Test with undefined input should return null
        result = countries_and_timezones.getCountryForTimezone(undefined);
        assert.strictEqual(result, null);

        done();
    });
});