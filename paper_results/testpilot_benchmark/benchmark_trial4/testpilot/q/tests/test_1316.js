let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with fulfilled callback returning value', function(done) {
        q.when('input', function(value) {
            return value.toUpperCase();
        }).then(function(result) {
            assert.equal(result, 'INPUT');
            done();
        }).catch(done);
    });
});