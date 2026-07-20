let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys - object with mixed property types', function(done) {
        let obj = { 
            stringKey: 'value1',
            123: 'numericKey',
            symbolKey: Symbol('test')
        };
        let promise = q(obj);
        
        promise.keys().then(function(keys) {
            // Should only include enumerable string keys
            let expectedKeys = ['stringKey', '123'].sort();
            assert.deepEqual(keys.sort(), expectedKeys);
            done();
        }).catch(done);
    });

    })