let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return countries for valid timezone Asia/Tokyo', function(done) {
        const result = countries_and_timezones.getCountriesForTimezone('Asia/Tokyo');
        assert(result !== null, 'Result should not be null');
        assert(typeof result === 'object', 'Result should be an object');
        assert(result.JP !== undefined, 'Should include Japan');
        done();
    });

    })