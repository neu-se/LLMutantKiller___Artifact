let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resolve with promise object', function(done) {
        let promiseObject = q.resolve({ async: 'value' });
        
        promiseObject.then(function(result) {
            assert.deepStrictEqual(result, { async: 'value' });
            done();
        }).catch(done);
    });
});