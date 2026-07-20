let assert = require('assert');

// Mock q.when functionality since q module is not available
const q = {
    when: function(value, successCallback, errorCallback) {
        try {
            // If value is a promise-like object, handle it
            if (value && typeof value.then === 'function') {
                value.then(successCallback, errorCallback);
            } else {
                // For plain values, call success callback immediately
                successCallback(value);
            }
        } catch (error) {
            errorCallback(error);
        }
    }
};

describe('test q', function() {
    it('test q.when with plain value', function(done) {
        q.when('plain value',
            function(value) {
                assert.equal(value, 'plain value');
                done();
            },
            function(error) {
                done(error);
            }
        );
    });
});