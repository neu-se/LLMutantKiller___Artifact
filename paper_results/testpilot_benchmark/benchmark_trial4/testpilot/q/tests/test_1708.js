let mocha = require('mocha');
let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test q.set adding new property', function(done) {
        let obj = {};
        
        Q.set(obj, 'newProp', 'newValue')
            .then(function(result) {
                assert.strictEqual(obj.newProp, 'newValue');
                assert.strictEqual(result, 'newValue');
                done();
            })
            .catch(done);
    });

    })