let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with promise object', function(done) {
        let obj = { foo: 'bar', num: 123 };
        let promiseObj = q.resolve(obj);
        
        q.get(promiseObj, 'foo').then(function(result) {
            assert.equal(result, 'bar');
            done();
        }).catch(done);
    });
});