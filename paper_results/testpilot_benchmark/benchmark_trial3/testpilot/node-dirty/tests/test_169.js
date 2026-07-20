let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('args-test', 'world', 99, {test: false});
        
        assert.strictEqual(receivedArgs, null, 'listener should not be called second time');
        
        done();
    });