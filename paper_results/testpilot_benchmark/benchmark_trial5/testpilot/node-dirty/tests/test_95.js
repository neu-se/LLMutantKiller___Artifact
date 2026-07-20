let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('test-event');
                
                // Give a small delay to ensure event processing
                setTimeout(() => {
                    assert.ok(eventFired, 'EventEmitter should still work after init');
                    done();
                }, 10);
            } catch (error) {
                done(error);
            }
        });

        