let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test');
            
            setTimeout(() => {
                // Order should remain the same (no additional calls)
                assert.deepStrictEqual(executionOrder, ['third', 'second', 'first']);
                done();
            }, 10);
        };
        
        db.prependOnceListener('multi-test', listener1);
        db.prependOnceListener('multi-test', listener2);
        db.prependOnceListener('multi-test', listener3);
        
        db.em