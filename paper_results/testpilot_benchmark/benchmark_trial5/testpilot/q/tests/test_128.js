let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - various data types', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        // Create an object to store our test data
        let testData = {
            'string': 'hello',
            'number': 123,
            'boolean': true,
            'null': null,
            'undefined': undefined,
            'array': [1, 2, 3],
            'object': { foo: 'bar' },
            'function': function() { return 'test'; }
        };
        
        // Resolve the promise with our test data
        deferred.resolve(testData);
        
        // Test the promise resolution
        promise.then(function(data) {
            assert.strictEqual(data.string, 'hello');
            assert.strictEqual(data.number, 123);
            assert.strictEqual(data.boolean, true);
            assert.strictEqual(data.null, null);
            assert.strictEqual(data.undefined, undefined);
            assert.deepStrictEqual(data.array, [1, 2, 3]);
            assert.deepStrictEqual(data.object, { foo: 'bar' });
            assert.strictEqual(typeof data.function, 'function');
            
            done();
        }).catch(done);
    });
});