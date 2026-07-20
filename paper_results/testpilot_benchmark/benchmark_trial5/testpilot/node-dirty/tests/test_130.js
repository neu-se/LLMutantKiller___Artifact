let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test');
        
        setTimeout(() => {
            assert.deepEqual(callOrder, ['first', 'second', 'last']);
            done();
        }, 10);
    });