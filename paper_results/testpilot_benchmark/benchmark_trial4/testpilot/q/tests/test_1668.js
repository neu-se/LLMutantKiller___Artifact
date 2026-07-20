let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with array', function(done) {
        let arr = ['first', 'second', 'third'];
        
        q.get(arr, '1').then(function(result) {
            assert.equal(result, 'second');
            done();
        }).catch(done);
    });
});