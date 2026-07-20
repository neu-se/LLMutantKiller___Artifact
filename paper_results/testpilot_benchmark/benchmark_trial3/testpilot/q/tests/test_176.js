let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should throw TypeError when resolver is not a function', function() {
        assert.throws(() => {
            new q.Promise(null);
        }, TypeError);
        
        assert.throws(() => {
            new q.Promise('not a function');
        }, TypeError);
        
        assert.throws(() => {
            new q.Promise(123);
        }, TypeError);
    });
});