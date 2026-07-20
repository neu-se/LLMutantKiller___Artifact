let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return timezones for a valid country code', function(done) {
        const timezones = countries_and_timezones.getTimezonesForCountry('US');
        assert(timezones !== null, 'Should return timezones for US');
        assert(Array.isArray(timezones), 'Should return an array');
        assert(timezones.length > 0, 'US should have at least one timezone');
        
        // Check that returned objects have timezone properties
        timezones.forEach(tz => {
            assert(typeof tz === 'object', 'Each timezone should be an object');
            assert(typeof tz.name === 'string', 'Timezone should have a name property');
        });
        done();
    });

    })