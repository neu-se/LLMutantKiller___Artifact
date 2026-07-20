let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenResolve with non-promise value', function(done) {
        let value = 'not a promise';
        let newValue = { key: 'object value' };
        
        q.thenResolve(value, newValue)
            .then(function(result) {
                assert.deepStrictEqual(result, newValue);
                done();
            })
            .catch(done);
    });

    })