let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should resolve with array when more than 2 arguments are passed', function(done) {
            var deferred = q.defer();
            var nodeResolver = deferred.makeNodeResolver();
            
            deferred.promise.then(function(values) {
                assert(Array.isArray(values));
                assert.strictEqual(values.length, 3);
                assert.strictEqual(values[0], 'value1');
                assert.strictEqual(values[1], 'value2');
                assert.strictEqual(values[2], 'value3');
                done();
            }).catch(done);
            
            nodeResolver(null, 'value1', 'value2', 'value3');
        });
        
            })
})