let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return countries for valid timezone Europe/London', function(done) {
        const result = countries_and_timezones.getCountriesForTimezone('Europe/London');
        assert(result !== null, 'Result should not be null');
        assert(typeof result === 'object', 'Result should be an object');
        assert(result.GB !== undefined, 'Should include Great Britain');
        done();
    });

    })