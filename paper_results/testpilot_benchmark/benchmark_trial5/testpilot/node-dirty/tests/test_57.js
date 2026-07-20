let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('remove-test');
        
        // Verify listener was not called
        setTimeout(() => {
            assert(listenerCalled === false, 'Removed listener should not be called');
            done();
        }, 10);
    });