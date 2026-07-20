let mocha = require('mocha');
let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test q.set with promised object', function(done) {
        let obj = { count: 0 };
        let promisedObj = Q(obj);
        
        Q.set(promisedObj, 'count', 42)
            .then(function(result) {
                assert.strictEqual(obj.count, 42);
                assert.strictEqual(result, 42);
                done();
            })
            .catch(done);
    });

    })