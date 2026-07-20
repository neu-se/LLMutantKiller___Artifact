let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke with non-existent method', function(done) {
        const mockObject = {};
        const promise = q.makePromise(mockObject);
        
        promise.ninvoke('nonExistentMethod')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert(error instanceof TypeError);
                done();
            });
    });

    })