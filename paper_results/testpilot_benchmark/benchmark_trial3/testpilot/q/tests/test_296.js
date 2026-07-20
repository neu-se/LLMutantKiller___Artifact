let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with promises that resolve to different values', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.resolve(24);
        
        q.join(promise1, promise2).then(function(result) {
            done(new Error('Expected rejection but got fulfillment'));
        }).catch(function(error) {
            // Expected rejection
            done();
        });
    });

    })