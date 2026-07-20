let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should coerce thenable objects', function(done) {
        let thenable = {
            then: function(onFulfilled, onRejected) {
                setTimeout(function() {
                    onFulfilled('thenable result');
                }, 10);
            }
        };
        
        let result = q(thenable);
        
        result.then(function(value) {
            assert.strictEqual(value, 'thenable result');
            done();
        }).catch(done);
    });
    
    })