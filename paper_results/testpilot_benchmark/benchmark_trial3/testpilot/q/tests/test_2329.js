let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with non-existent method', function(done) {
        const mockObject = {};

        q.ninvoke(mockObject, 'nonExistentMethod')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                // Should fail because the method doesn't exist
                assert(error instanceof Error);
                done();
            });
    });
});