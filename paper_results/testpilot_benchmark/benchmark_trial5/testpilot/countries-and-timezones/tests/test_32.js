let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getCountriesForTimezone with another valid timezone', function(done) {
        // Test with Europe/London timezone
        const result = countries_and_timezones.getCountriesForTimezone('Europe/London');
        
        assert(result !== null, 'Result should not be null');
        assert(typeof result === 'object', 'Result should be an object');
        assert(Object.keys(result).length > 0, 'Result should contain at least one country');
        
        // Check that at least one of the expected countries is included for Europe/London timezone
        const countryKeys = Object.keys(result);
        const hasExpectedCountry = countryKeys.some(key => ['GB', 'UK', 'IM', 'JE', 'GG'].includes(key));
        assert(hasExpectedCountry, `Expected one of GB, UK, IM, JE, or GG to be included for Europe/London timezone. Found: ${countryKeys.join(', ')}`);
        
        done();
    });
});