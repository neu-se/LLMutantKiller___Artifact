let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle asynchronous resolution', function(done) {
        const promise = q.Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('async success');
            }, 10);
        });
        
        promise.then((value) => {
            assert.strictEqual(value, 'async success');
            done();
        }).catch(done);
    });

    })