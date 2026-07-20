let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with array and numeric index', function(done) {
        let arr = ['apple', 'banana', 'cherry'];
        let result = q.get(arr, '1');
        
        result.then(function(value) {
            assert.strictEqual(value, 'banana');
            done();
        }).catch(done);
    });

    })