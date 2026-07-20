let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get - should handle null/undefined objects gracefully', function(done) {
        let promise = q.resolve(null);
        
        promise.get('anyKey').then(function() {
            done(new Error('Should not resolve'));
        }).catch(function(error) {
            assert(error instanceof TypeError);
            done();
        });
    });

    })