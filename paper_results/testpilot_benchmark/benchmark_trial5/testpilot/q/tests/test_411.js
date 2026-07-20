let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer with function object', function(done) {
        let testFunction = function() { return 'hello'; };
        let deferred = q.defer();
        
        assert(typeof deferred.promise.isDef !== 'function', 'deferred promise should not have isDef method');
        assert(typeof deferred.resolve === 'function', 'deferred should have resolve method');
        
        // Test that inspect works with promises
        let inspection = deferred.promise.inspect();
        assert(inspection !== null, 'inspect should work with promises');
        assert(inspection.state === 'pending', 'initial state should be pending');
        
        done();
    });
});