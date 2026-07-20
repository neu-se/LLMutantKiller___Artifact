let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with promise object', function(done) {
        function asyncFunc(x, y) {
            return q.resolve(x * y);
        }
        
        let promiseFunc = q.resolve(asyncFunc);
        let boundFunc = q.fbind(promiseFunc, 5);
        let result = boundFunc(4);
        
        q.when(result).then(function(value) {
            assert.equal(value, 20);
            done();
        }).catch(done);
    });
    
    })