let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get - should chain multiple get calls', function(done) {
        let testObj = { 
            level1: { 
                level2: { 
                    value: 'deep value' 
                } 
            } 
        };
        let promise = q.resolve(testObj);
        
        promise.get('level1')
               .get('level2')
               .get('value')
               .then(function(value) {
                   assert.strictEqual(value, 'deep value');
                   done();
               }).catch(done);
    });
});