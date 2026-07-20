let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('args-test', 'hello', 'world');
        
        setTimeout(() => {
            assert.deepEqual(receivedArgs, [
                ['prepended', 'hello', 'world'],
                ['regular', 'hello', 'world']
            ]);
            done();
        }, 10);
    });