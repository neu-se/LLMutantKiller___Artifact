let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return null or empty object for invalid timezone', function(done) {
        const result = countries_and_timezones.getCountriesForTimezone('Invalid/Timezone');
        assert(result === null || (typeof result === 'object' && Object.keys(result).length === 0), 
               'Should return null or empty object for invalid timezone');
        done();
    });

    })