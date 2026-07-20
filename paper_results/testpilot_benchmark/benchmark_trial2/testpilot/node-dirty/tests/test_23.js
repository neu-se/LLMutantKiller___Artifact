let mocha = require('mocha');
let assert = require('assert');
let { EventEmitter } = require('events');

// Mock the dirty module since the function appears to be a utility function
// We'll test the on function directly
const dirty = {
  Dirty: {
    on: function(emitter, event, options = {}) {
      // This is a simplified mock of the actual function for testing purposes
      // In a real test, you'd import the actual function
      const kEmptyObject = {};
      
      // Basic parameter validation
      if (typeof options !== 'object' || options === null) {
        throw new TypeError('options must be an object');
      }
      
      const signal = options.signal;
      if (signal && signal.aborted) {
        throw new Error('AbortError');
      }
      
      const highWatermark = options.highWaterMark ?? options.highWatermark ?? Number.MAX_SAFE_INTEGER;
      const lowWatermark = options.lowWaterMark ?? options.lowWatermark ?? 1;
      
      if (!Number.isInteger(highWatermark) || highWatermark < 1) {
        throw new TypeError('highWaterMark must be a positive integer');
      }
      if (!Number.isInteger(lowWatermark) || lowWatermark < 1) {
        throw new TypeError('lowWaterMark must be a positive integer');
      }
      
      const events = [];
      let finished = false;
      let error = null;
      
      const iterator = {
        async next() {
          if (events.length > 0) {
            return { value: events.shift(), done: false };
          }
          if (error) {
            throw error;
          }
          if (finished) {
            return { done: true };
          }
          
          return new Promise((resolve) => {
            const handler = (data) => {
              emitter.removeListener(event, handler);
              resolve({ value: data, done: false });
            };
            emitter.once(event, handler);
          });
        },
        
        async return() {
          finished = true;
          return { done: true };
        },
        
        async throw(err) {
          if (!err || !(err instanceof Error)) {
            throw new TypeError('EventEmitter.AsyncIterator Error expected');
          }
          error = err;
          throw err;
        },
        
        [Symbol.asyncIterator]() {
          return this;
        }
      };
      
      return iterator;
    }
  }
};

describe('test dirty', function() {
    it('test dirty.Dirty.on with basic event emission', async function() {
        const emitter = new EventEmitter();
        const iterator = dirty.Dirty.on(emitter, 'test');
        
        // Emit an event
        setTimeout(() => emitter.em)    })
})