Looking at this function, I can see it creates an async iterator for events from an emitter with watermark-based flow control. Here's a comprehensive test suite:

```javascript
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    describe('dirty.Dirty.on', function() {
        let emitter;
        
        beforeEach(function() {
            emitter = new EventEmitter();
        });

        it('should create an async iterator for events', async function() {
            const iterator = dirty.Dirty.on(emitter, 'test');
            
            // Verify it's an async iterator
            assert(typeof iterator[Symbol.asyncIterator] === 'function');
            assert(typeof iterator.next === 'function');
            assert(typeof iterator.return === 'function');
            assert(typeof iterator.throw === 'function');
            
            // Clean up
            await iterator.return();
        });

        it('should consume events in order', async function() {
            const iterator = dirty.Dirty.on(emitter, 'test');
            
            // Emit some events
            setTimeout(() => {
                emitter.emit('test', 'event1');
                emitter.emit('test', 'event2');
                emitter.emit('test', 'event3');
            }, 10);
            
            const results = [];
            let count = 0;
            for await (const event of iterator) {
                results.push(event);
                count++;
                if (count === 3) break;
            }
            
            assert.deepEqual(results, ['event1', 'event2', 'event3']);
            await iterator.return();
        });

        it('should handle multiple arguments as array when kFirstEventParam is false', async function() {
            const iterator = dirty.Dirty.on(emitter, 'test');
            
            setTimeout(() => {
                emitter.emit('test', 'arg1', 'arg2', 'arg3');
            }, 10);
            
            const result = await iterator.next();
            assert.deepEqual(result.value, ['arg1', 'arg2', 'arg3']);
            assert.equal(result.done, false);
            
            await iterator.return();
        });

        it('should respect highWaterMark and pause emitter', async function() {
            const iterator = dirty.Dirty.on(emitter, 'test', { highWaterMark: 2 });
            let pauseCalled = false;
            
            emitter.pause = function() {
                pauseCalled = true;
            };
            
            // Emit more events than highWaterMark
            emitter.emit('test', 'event1');
            emitter.emit('test', 'event2');
            emitter.emit('test', 'event3'); // This should trigger pause
            
            assert(pauseCalled, 'Emitter should be paused when highWaterMark is exceeded');
            assert(iterator[Symbol.for('nodejs.watermarkData')].isPaused);
            
            await iterator.return();
        });

        it('should respect lowWaterMark and resume emitter', async function() {
            const iterator = dirty.Dirty.on(emitter, 'test', { 
                highWaterMark: 3, 
                lowWaterMark: 1 
            });
            let resumeCalled = false;
            
            emitter.pause = function() {};
            emitter.resume = function() {
                resumeCalled = true;
            };
            
            // Fill up to trigger pause
            emitter.emit('test', 'event1');
            emitter.emit('test', 'event2');
            emitter.emit('test', 'event3');
            emitter.emit('test', 'event4'); // Triggers pause
            
            // Consume events to trigger resume
            await iterator.next(); // size becomes 3
            await iterator.next(); // size becomes 2  
            await iterator.next(); // size becomes 1, should trigger resume
            
            assert(resumeCalled, 'Emitter should be resumed when size drops to lowWaterMark');
            
            await iterator.return();
        });

        it('should handle errors properly', async function() {
            const iterator = dirty.Dirty.on(emitter, 'test');
            const testError = new Error('Test error');
            
            setTimeout(() => {
                emitter.emit('error', testError);
            }, 10);
            
            try {
                await iterator.next();
                assert.fail('Should have thrown an error');
            } catch (err) {
                assert.equal(err, testError);
            }
        });

        it('should handle AbortSignal', async function() {
            const controller = new AbortController();
            const iterator = dirty.Dirty.on(emitter, 'test', { 
                signal: controller.signal 
            });
            
            setTimeout(() => {
                controller.abort(new Error('Aborted'));
            }, 10);
            
            try {
                await iterator.next();
                assert.fail('Should have thrown AbortError');
            } catch (err) {
                assert(err.name === 'AbortError' || err.message.includes('aborted'));
            }
        });

        it('should throw if signal is already aborted', function() {
            const controller = new AbortController();
            controller.abort();
            
            assert.throws(() => {
                dirty.Dirty.on(emitter, 'test', { signal: controller.signal });
            });
        });

        it('should handle close events', async function() {
            const iterator = dirty.Dirty.on(emitter, 'test', { 
                close: ['close', 'end'] 
            });
            
            setTimeout(() => {
                emitter.emit('close');
            }, 10);
            
            const result = await iterator.next();
            assert(result.done, 'Iterator should be done after close event');
        });

        it('should validate options parameter', function() {
            assert.throws(() => {
                dirty.Dirty.on(emitter, 'test', 'invalid');
            }, /options/);
        });

        it('should validate highWaterMark parameter', function() {
            assert.throws(() => {
                dirty.Dirty.on(emitter, 'test', { highWaterMark: 0 });
            });
            
            assert.throws(() => {
                dirty.Dirty.on(emitter, 'test', { highWaterMark: 'invalid' });
            });
        });

        it('should validate lowWaterMark parameter', function() {
            assert.throws(() => {
                dirty.Dirty.on(emitter, 'test', { lowWaterMark: 0 });
            });
            
            assert.throws(() => {
                dirty.Dirty.on(emitter, 'test', { lowWaterMark: 'invalid' });
            });
        });

        it('should support backward compatibility for watermark options', async function() {
            // Test highWatermark (old name)
            const iterator1 = dirty.Dirty.on(emitter, 'test', { highWatermark: 5 });
            assert.equal(iterator1[Symbol.for('nodejs.watermarkData')].high, 5);
            await iterator1.return();
            
            // Test lowWatermark (old name)
            const iterator2 = dirty.Dirty.on(emitter, 'test', { lowWatermark: 3 });
            assert.equal(iterator2[Symbol.for('nodejs.watermarkData')].low, 3);
            await iterator2.return();
        });

        it('should expose watermark data', function() {
            const iterator = dirty.Dirty.on(emitter, 'test', {
                highWaterMark: 10,
                lowWaterMark: 2
            });
            
            const watermarkData = iterator[Symbol.for('nodejs.watermarkData')];
            assert.equal(watermark