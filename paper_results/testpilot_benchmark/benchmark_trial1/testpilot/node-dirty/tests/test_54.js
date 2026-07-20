let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('once-test');

            setImmediate(() => {
                assert.strictEqual(callCount, 1, 'Once listener should only be called once');
                done();
            });
        } else {
            // Skip test if once method is not available
            done();
        }
    });
});