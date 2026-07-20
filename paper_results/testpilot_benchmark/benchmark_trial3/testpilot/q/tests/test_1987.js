let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with non-promise value', function(done) {
        let value = 'plain value';
        let catchCalled = false;
        
        q.catch(value, function(error) {
            catchCalled = true;
        }).then(function(result) {
            assert.strictEqual(result, 'plain value');
            assert.strictEqual(catchCalled, false);
            done();
        });
    });
    
    })