let mocha = require('mocha');
let assert = require('assert');
let countries_and_timezones = require('countries-and-timezones');

describe('test countries_and_timezones', function() {
    it('test countries-and-timezones.getAllTimezones returns object', function(done) {
        const result = countries_and_timezones.getAllTimezones();
        assert(typeof result === 'object', 'getAllTimezones should return an object');
        assert(result !== null, 'getAllTimezones should not return null');
        done();
    });

    })