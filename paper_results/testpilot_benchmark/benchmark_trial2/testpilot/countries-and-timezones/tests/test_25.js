let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('should return null for invalid country code', function(done) {
        const timezones = countries_and_timezones.getTimezonesForCountry('INVALID');
        
        assert(timezones === null, 'Result should be null for invalid country code');
        
        done();
    });
});