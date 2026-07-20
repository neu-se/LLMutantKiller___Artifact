let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with non-promise value', function(done) {
        let value = 'plain value';
        
        q.catch(value, function(error) {
            // This should not be called
            done(new Error('Catch handler should not be called for non-promise value'));
        }).then(function(result) {
            assert.strictEqual(result, 'plain value');
            done();
        });
    });
    
    })