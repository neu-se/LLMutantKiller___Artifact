let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with promise object', function(done) {
        let promiseObj = q.resolve({ status: 'success', data: 'test data' });
        
        q.get(promiseObj, 'status')
            .then(function(result) {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});