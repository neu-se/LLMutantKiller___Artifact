let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master return type and properties', function(done) {
        let testObject = {
            getValue: function() {
                return 42;
            }
        };
        
        try {
            let master = q.master(testObject);
            
            // Check basic properties of the returned master object
            assert(typeof master === 'object', 'Master should be an object');
            assert(master !== testObject, 'Master should be different from input object');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});