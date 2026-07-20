let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should resolve when resolver calls resolve', function(done) {
        const promise = q.Promise((resolve, reject) => {
            resolve('success');
        });
        
        promise.then((value) => {
            assert.strictEqual(value, 'success');
            done();
        }).catch(done);
    });

    })