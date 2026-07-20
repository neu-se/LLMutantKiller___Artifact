let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - promise initial state', function() {
        const deferred = q.defer();
        const promise = deferred.promise;
        
        assert.equal(promise.inspect().state, 'pending', 'promise should initially be pending');
    });
});