import { EventEmitter } from 'events';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

let mockReadStream: any;
let mockWriteStream: any;

jest.mock('fs', () => {
  const actual = jest.requireActual('fs');
  return {
    ...actual,
    createReadStream: jest.fn(() => mockReadStream),
    createWriteStream: jest.fn(() => mockWriteStream),
  };
});

describe('Dirty drain event emission after write stream drain', () => {
  it('should emit drain when write stream drains with empty queue and no in-flight writes', async () => {
    mockReadStream = new EventEmitter();
    mockReadStream.destroy = jest.fn();
    
    mockWriteStream = new EventEmitter();
    let pendingCallback: ((err: Error | null) => void) | null = null;
    
    mockWriteStream.cork = jest.fn();
    mockWriteStream.uncork = jest.fn(() => {
      if (pendingCallback) {
        const cb = pendingCallback;
        pendingCallback = null;
        // Simulate: write callback fires BEFORE stream drain event
        // This creates the scenario where _waitForDrain is true when callback fires
        setImmediate(() => {
          cb(null); // _inFlightWrites -> 0, but _waitForDrain still true -> no drain
          setImmediate(() => {
            mockWriteStream.emit('drain'); // stream drain fires after callback
            // Original: _inFlightWrites=0, queue empty -> emit dirty drain
            // Mutated: does nothing
          });
        });
      }
    });
    mockWriteStream.write = jest.fn((data: any, cb: (err: Error | null) => void) => {
      pendingCallback = cb;
      return false; // backpressure: _waitForDrain will be set to true
    });
    mockWriteStream.end = jest.fn((cb?: () => void) => { if (cb) cb(); });
    mockWriteStream.destroy = jest.fn();
    
    const db = new Dirty('/fake/path.db');
    
    setImmediate(() => {
      mockReadStream.emit('end');
      mockReadStream.emit('close');
    });
    
    await new Promise<void>((resolve) => db.once('load', () => resolve()));
    
    const drainPromise = new Promise<boolean>((resolve) => {
      const timeout = setTimeout(() => resolve(false), 3000);
      db.once('drain', () => {
        clearTimeout(timeout);
        resolve(true);
      });
    });
    
    db.set('key', 'value');
    
    expect(await drainPromise).toBe(true);
  });
});