let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.addAbortListener', function() {
        
        it('should throw error when signal is undefined', function() {
            assert.throws(() => {
                dirty.Dirty.addAbortListener(undefined, () => {});
            }, /signal/);
        });

            })
})