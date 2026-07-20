let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master preserves method context', function(done) {
        let testObj = {
            value: 'test value',
            getValue: function() {
                return this.value;
            }
        };
        
        let master = q.master(testObj);
        
        master.getValue().then(function(result) {
            assert.equal(result, 'test value');
            done();
        }).catch(done);
    });
    
    })