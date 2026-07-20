let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master preserves method context', function(done) {
        let testObj = {
            value: 'test value',
            getValue: function() {
                return this.value;
            }
        };
        
        // Create a master object that wraps methods to return promises
        let master = {
            getValue: function() {
                return q.resolve(testObj.getValue.call(testObj));
            }
        };
        
        master.getValue().then(function(result) {
            assert.equal(result, 'test value');
            done();
        }).catch(done);
    });
});