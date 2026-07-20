let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with method that has context dependency', function(done) {
        let testObject = {
            value: 42,
            getValue: function() {
                return this.value;
            }
        };
        
        q.post(testObject, 'getValue', [])
            .then(function(result) {
                assert.equal(result, 42);
                done();
            })
            .catch(done);
    });
});