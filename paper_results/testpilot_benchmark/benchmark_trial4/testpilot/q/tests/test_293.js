let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with immediate value and function', function(done) {
        let value = 'hello';
        let joinFunction = function(val) {
            return val + ' world';
        };
        
        q.join(value, joinFunction)
            .then(function(result) {
                assert.equal(result, 'hello world');
                done();
            })
            .catch(done);
    });

    })