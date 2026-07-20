import * as fs from 'fs';
import { EventEmitter } from 'events';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event emission', () => {
  it('should emit drain event when write stream drains with empty queue and no in-flight writes', async () => {
    // Mock read stream
    const readStream = new EventEmitter() as any;
    readStream.destroy = jest.fn();
    
    // Mock write stream
    const writeStream = new EventEmitter() as any;
    let pendingCallback: ((err: Error | null) => void) | null = null;
    
    writeStream.cork = jest.fn();
    writeStream.uncork = jest.fn(() => {
      if (pendingCallback) {
        const cb = pendingCallback;
        pendingCallback = null;
        // Simulate: write callback fires first, THEN stream drain event fires
        // This creates the scenario where the mutation matters
        setImmediate(() => {
          cb(null); // Write callback fires, _inFlightWrites -> 0, but _waitForDrain is still true
          setImmediate(() => {
            writeStream.emit('drain'); // Stream drain event fires after callback
          });
        });
      }
    });
    writeStream.write = jest.fn((data: string, cb: (err: Error | null) => void) => {
      pendingCallback = cb;
      return false; // Simulate backpressure, _waitForDrain = true
    });
    writeStream.end = jest.fn((cb?: () => void) => { if (cb) cb(); });
    writeStream.destroy = jest.fn();
    
    const createReadStreamSpy = jest.spyOn(fs, 'createReadStream').mockReturnValue(readStream as any);
    const createWriteStreamSpy = jest.spyOn(fs, 'createWriteStream').mockReturnValue(writeStream as any);
    
    try {
      const db = new Dirty('/fake/path.db');
      
      // Trigger load
      setImmediate(() => {
        readStream.emit('end');
        readStream.emit('close');
      });
      
      await new Promise<void>((resolve) => db.once('load', () => resolve()));
      
      // Listen for drain before setting
      const drainPromise = new Promise<boolean>((resolve) => {
        const timeout = setTimeout(() => resolve(false), 3000);
        db.once('drain', () => {
          clearTimeout(timeout);
          resolve(true);
        });
      });
      
      db.set('key', 'value');
      
      const drained = await drainPromise;
      expect(drained).toBe(true);
    } finally {
      createReadStreamSpy.mockRestore();
      createWriteStreamSpy.mockRestore();
    }
  });
});