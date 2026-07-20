let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with primitive values', function(done) {
        let number = 42;
        let string = "hello";
        let boolean = true;
        
        let copiedNumber = q.passByCopy(number);
        let copiedString = q.passByCopy(string);
        let copiedBoolean = q.passByCopy(boolean);
        
        assert.strictEqual(copiedNumber, number);
        assert.strictEqual(copiedString, string);
        assert.strictEqual(copiedBoolean, boolean);
        done();
    });
    
    })