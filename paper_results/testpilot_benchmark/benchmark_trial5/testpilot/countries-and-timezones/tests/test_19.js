let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return null for invalid country code', function() {
        const timezones = countries_and_timezones.getTimezonesForCountry('INVALID');
        
        assert.strictEqual(timezones, null, 'Should return null for invalid country code');
    });

    })