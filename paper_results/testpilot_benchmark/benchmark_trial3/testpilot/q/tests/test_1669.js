let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with immediate object', function(done) {
        let obj = { name: 'test', value: 42 };
        
        q.get(obj, 'name').then(function(result) {
            assert.equal(result, 'test');
            done();
        }).catch(done);
    });
});