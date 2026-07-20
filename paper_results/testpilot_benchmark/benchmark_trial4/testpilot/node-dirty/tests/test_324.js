let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    it('drain');
        }, 10);
        
        // Mock streams to verify they're not called immediately
        let readStreamDestroyed = false;
        let writeStreamEnded = false;
        
        db._readStream = {
            destroy: () => { readStreamDestroyed = true; }
        };
        db._writeStream = {
            end: (callback) => { 
                writeStreamEnded = true;
                if (callback) callback();
            },
            destroy: () => {}
        };
        
        db.close();
        
        // Verify streams weren't destroyed immediately
        assert.strictEqual(readStreamDestroyed, false);
        assert.strictEqual(writeStreamEnded, false);
        
        setTimeout(() => {
            assert.strictEqual(drainEmitted, true);
            assert.strictEqual(readStreamDestroyed, true);
            assert.strictEqual(writeStreamEnded, true);
            done();
        }, 20);
    });

    