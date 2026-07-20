let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set with null values', function(done) {
        let mockPromise = {
            dispatch: function(method, args) {
                assert.equal(method, 'set');
                assert.equal(args[0], null);
                assert.equal(args[1], undefined);
                return q.resolve('handled null values');
            }
        };
        
        let result = q.makePromise.prototype.set.call(mockPromise, null, undefined);
        
        result.then(function(value) {
            assert.equal(value, 'handled null values');
            done();
        }).catch(done);
    });
    
    })