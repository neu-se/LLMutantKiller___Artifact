let mocha = require('mocha');
let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test q.set with promise object', function(done) {
        let obj = { count: 0 };
        let promiseObj = Q(obj);
        
        Q.set(promiseObj, 'count', 42)
            .then(function(result) {
                assert.equal(obj.count, 42);
                done();
            })
            .catch(done);
    });

    })