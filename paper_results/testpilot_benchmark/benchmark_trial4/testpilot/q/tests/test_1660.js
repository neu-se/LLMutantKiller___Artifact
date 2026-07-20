let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with array index', function(done) {
        let arr = ['apple', 'banana', 'cherry'];
        
        q.get(arr, 1)
            .then(function(result) {
                assert.strictEqual(result, 'banana');
                done();
            })
            .catch(done);
    });

    })