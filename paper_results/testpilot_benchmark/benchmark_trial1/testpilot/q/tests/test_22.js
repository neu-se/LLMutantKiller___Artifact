let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should throw TypeError when resolver is not a function', function() {
        assert.throws(() => {
            q.Promise(null);
        }, TypeError, 'resolver must be a function.');
        
        assert.throws(() => {
            q.Promise('not a function');
        }, TypeError, 'resolver must be a function.');
        
        assert.throws(() => {
            q.Promise(123);
        }, TypeError, 'resolver must be a function.');
    });

    })