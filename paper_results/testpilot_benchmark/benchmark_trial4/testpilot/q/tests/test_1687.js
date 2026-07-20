let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with promise object', function(done) {
        let promiseObj = q.resolve({ data: 'test value' });
        let result = q.get(promiseObj, 'data');
        
        result.then(function(value) {
            assert.strictEqual(value, 'test value');
            done();
        }).catch(done);
    });
});