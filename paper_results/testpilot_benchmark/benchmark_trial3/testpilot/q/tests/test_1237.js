let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - method not found', function(done) {
        const mockObject = {};
        const promise = q(mockObject);
        
        promise.ninvoke('nonExistentMethod')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                // Should reject when method doesn't exist
                done();
            });
    });

    })