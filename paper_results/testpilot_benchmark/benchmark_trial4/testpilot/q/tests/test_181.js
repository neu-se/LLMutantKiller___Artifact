let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise - resolver throws exception', function(done) {
        let promise = q.Promise(function(resolve, reject) {
            throw new Error('resolver exception');
        });
        
        promise.then(function(value) {
            done(new Error('Should not resolve'));
        }).catch(function(error) {
            assert.equal(error.message, 'resolver exception');
            done();
        });
    });
});