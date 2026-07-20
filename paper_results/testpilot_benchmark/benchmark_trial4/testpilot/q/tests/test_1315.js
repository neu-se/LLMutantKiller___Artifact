let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with fulfilled callback throwing error', function(done) {
        q.when('test', function(value) {
            throw new Error('callback error');
        }, function(error) {
            // This won't be called since the value resolves successfully
            done(new Error('Should not reach rejected handler'));
        }).catch(function(error) {
            assert.equal(error.message, 'callback error');
            done();
        });
    });
});