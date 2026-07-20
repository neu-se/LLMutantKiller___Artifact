let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getCountriesForTimezone with invalid timezone', function(done) {
        // Test with an invalid/non-existent timezone
        const result = countries_and_timezones.getCountriesForTimezone('Invalid/Timezone');
        
        assert(result !== null, 'Result should not be null even for invalid timezone');
        assert(typeof result === 'object', 'Result should be an object');
        assert(Object.keys(result).length === 0, 'Result should be empty for invalid timezone');
        
        done();
    });

    })