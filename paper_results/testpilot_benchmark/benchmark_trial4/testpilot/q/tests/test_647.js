let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get returns promise that resolves', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.dispatch = function(method, args) {
            return q.resolve('test value');
        };
        
        let result = promise.get('someKey');
        
        result.then(function(value) {
            assert.strictEqual(value, 'test value', 'promise should resolve with dispatched value');
            done();
        }).catch(done);
    });
    
    })