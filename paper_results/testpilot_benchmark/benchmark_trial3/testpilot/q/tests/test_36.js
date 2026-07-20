let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should create a resolved promise with an array value', function(done) {
        let testArray = [1, 2, 3, 'test'];
        let promise = q(testArray);
        promise.then(function(result) {
            assert.deepStrictEqual(result, testArray);
            done();
        }).catch(done);
    });
});