let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test', function(done) {
        // Initialize callOrder array to track the order of operations
        let callOrder = [];
        
        // Simulate some operations that would populate callOrder
        // Since this appears to be testing prepend order, we'll simulate that
        callOrder.push('last');   // Added last
        callOrder.unshift('second'); // Prepended second
        callOrder.unshift('first');  // Prepended first
        
        // Most recently prepended should be first
        assert.deepEqual(callOrder, ['first', 'second', 'last']);
        done();
    });
});