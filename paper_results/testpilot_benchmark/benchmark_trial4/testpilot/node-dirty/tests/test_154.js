let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test');
        
        // Most recently prepended should be first
        assert.deepEqual(callOrder, ['first', 'second', 'last']);
        done();
    });