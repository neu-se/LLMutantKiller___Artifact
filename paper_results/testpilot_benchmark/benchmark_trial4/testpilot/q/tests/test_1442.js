let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.getUnhandledReasons returns array', function(done) {
        let reasons = q.getUnhandledReasons();
        assert(Array.isArray(reasons), 'getUnhandledReasons should return an array');
        done();
    });
});