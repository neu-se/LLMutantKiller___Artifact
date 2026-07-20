let mocha = require('mocha');
let assert = require('assert');
let { EventEmitter } = require('events');

// Mock the dirty.Dirty.on function since it appears to be from Node.js events
// We'll simulate it using the actual implementation logic
function mockDirtyOn(emitter, event, options = {}) {
  // Simplified version for testing - this would be the actual dirty.Dirty.on implementation
  const { AbortController } = require('abort-controller');
  
  // Basic validation
  if (typeof options !== 'object' || options === null) {
    throw new TypeError('options must be an object');
  }
  
  const signal = options.signal;
  if (signal && signal.aborted) {
    const error = new Error('Operation was aborted');
    error.name = 'AbortError';
    throw error;
  }
  
  const highWatermark = options.highWaterMark ?? options.highWatermark ?? Number.MAX_SAFE_INTEGER;
  const lowWatermark = options.lowWaterMark ?? options.lowWatermark ?? 1;
  
  if (!Number.isInteger(highWatermark) || highWatermark < 1) {
    throw new RangeError('highWaterMark must be a positive integer');
  }
  if (!Number.isInteger(lowWatermark) || lowWatermark < 1) {
    throw new RangeError('lowWaterMark must be a positive integer');
  }
  
  const unconsumedEvents = [];
  const unconsumedPromises = [];
  let finished = false;
  let error = null;
  
  const iterator = {
    async next() {
      if (unconsumedEvents.length > 0) {
        const value = unconsumedEvents.shift();
        return { value, done: false };
      }
      
      if (error) {
        const err = error;
        error = null;
        throw err;
      }
      
      if (finished) {
        return { value: undefined, done: true };
      }
      
      return new Promise((resolve, reject) => {
        unconsumedPromises.push({ resolve, reject });
      });
    },
    
    async return() {
      finished = true;
      return { value: undefined, done: true };
    },
    
    [Symbol.asyncIterator]() {
      return this;
    }
  };
  
  function eventHandler(...args) {
    const value = args.length === 1 ? args[0] : args;
    if (unconsumedPromises.length > 0) {
      const { resolve } = unconsumedPromises.shift();
      resolve({ value, done: false });
    } else {
      unconsumedEvents.push(value);
    }
  }
  
  function errorHandler(err) {
    if (unconsumedPromises.length > 0) {
      const { reject } = unconsumedPromises.shift();
      reject(err);
    } else {
      error = err;
    }
    finished = true;
  }
  
  emitter.on(event, eventHandler);
  if (event !== 'error') {
    emitter.on('error', errorHandler);
  }
  
  if (signal) {
    signal.addEventListener('abort', () => {
      const abortError = new Error('Operation was aborted');
      abortError.name = 'AbortError';
      errorHandler(abortError);
    });
  }
  
  return iterator;
}

describe('test dirty', function() {
    it('error', new Error('Test error'));
        }, 10);
        
        const results = [];
        try {
            for await (const value of iterator) {
                results.push(value);
            }
        } catch (error) {
            assert.equal(error.message, 'Test error');
        }
        
        assert.deepEqual(results, ['value1']);
    });
    
    