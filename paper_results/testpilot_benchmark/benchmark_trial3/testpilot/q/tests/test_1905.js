let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with delayed promise', function(done) {
        let deferred = q.defer();
        setTimeout(function() {
            deferred.resolve({ delayed: 'value', another: 'prop' });
        }, 10);
        
        q.keys(deferred.promise).then(function(keys) {
            assert.deepEqual(keys.sort(), ['another', 'delayed']);
            done();
        }).catch(done);
    });
});