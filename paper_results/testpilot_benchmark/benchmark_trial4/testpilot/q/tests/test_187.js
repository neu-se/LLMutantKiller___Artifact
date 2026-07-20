let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise - resolve', function(done) {
        let promise = q.Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve('success');
            }, 10);
        });
        
        promise.then(function(value) {
            assert.equal(value, 'success');
            done();
        }).catch(done);
    });
});