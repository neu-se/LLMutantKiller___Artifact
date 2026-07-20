let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch handler returns value', function(done) {
        let rejectedPromise = q.reject(new Error('Original error'));
        
        rejectedPromise.catch(function(error) {
            return 'recovered value';
        }).then(function(value) {
            assert.strictEqual(value, 'recovered value');
            done();
        });
    });
});