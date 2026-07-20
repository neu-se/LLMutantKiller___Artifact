let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with rejected callback handling', function(done) {
        let promise = q.reject('original error');
        q.when(promise, 
            function(value) {
                return value;
            }, 
            function(error) {
                return 'recovered from: ' + error;
            }
        ).then(function(result) {
            assert.equal(result, 'recovered from: original error');
            done();
        }).catch(done);
    });
});