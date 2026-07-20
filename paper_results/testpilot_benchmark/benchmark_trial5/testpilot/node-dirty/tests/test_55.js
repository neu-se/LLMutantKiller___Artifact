let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-event');
        
        // Verify both listeners were called
        setTimeout(() => {
            assert(listener1Called === true, 'First listener should be called');
            assert(listener2Called === true, 'Second listener should be called');
            done();
        }, 10);
    });