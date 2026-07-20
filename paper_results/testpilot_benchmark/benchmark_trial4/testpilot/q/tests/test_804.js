let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - function throws error', function(done) {
        let throwingFunction = function(msg) {
            throw new Error(msg);
        };
        
        let promise = q.resolve(throwingFunction);
        let boundFunction = promise.fbind('Bound error');
        
        boundFunction().then(function(result) {
            done(new Error('Should not resolve'));
        }).catch(function(error) {
            assert.equal(error.message, 'Bound error');
            done();
        });
    });
});