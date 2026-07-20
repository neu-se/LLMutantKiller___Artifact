let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('args-test', function(done) {
        let receivedArgs = ['hello', 'world'];
        
        assert.deepEqual(receivedArgs, ['hello', 'world']);
        done();
    });
});