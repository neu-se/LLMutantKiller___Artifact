let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('should return the EventEmitter instance for chaining', function() {
        let db = dirty();
        let result = db.prependOnceListener('test', () => {});
        
        assert.strictEqual(result, db, 'prependOnceListener should return the EventEmitter instance');
    });
    
    })