import * as fs from 'fs';
import { EventEmitter } from 'events';

describe('Dirty chunk processing', () => {
  it('should handle empty chunk correctly - not process buffered complete rows prematurely', (done) => {
    const originalCreateReadStream = fs.createReadStream;
    const originalCreateWriteStream = fs.createWriteStream;
    
    let readStreamRef: EventEmitter;
    
    const mockReadStream = new EventEmitter() as any;
    mockReadStream.destroy = () => {};
    
    const mockWriteStream = new EventEmitter() as any;
    mockWriteStream.write = () => true;
    mockWriteStream.end = (cb: any) => { if (cb) cb(); return mockWriteStream; };
    mockWriteStream.destroy = () => {};
    mockWriteStream.cork = () => {};
    mockWriteStream.uncork = () => {};
    
    (fs as any).createReadStream = () => mockReadStream;
    (fs as any).createWriteStream = () => mockWriteStream;
    
    delete require.cache[require.resolve('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js')];
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    const errors: string[] = [];
    const db = new Dirty('fake.db');
    
    db.on('error', (err: Error) => {
      errors.push(err.message);
    });
    
    db.on('load', (count: number) => {
      (fs as any).createReadStream = originalCreateReadStream;
      (fs as any).createWriteStream = originalCreateWriteStream;
      
      try {
        // Original: empty chunk causes early return, leaving complete row in buffer
        // At 'end', buffer is non-empty -> error emitted, count = 0
        // Mutated: empty chunk processes the row, buffer empty at end -> no error, count = 1
        expect(errors.length).toBeGreaterThan(0); // Original emits error
        expect(count).toBe(0);
        done();
      } catch (err) {
        done(err);
      }
    });
    
    // Send a complete row chunk, then empty chunk, then end
    process.nextTick(() => {
      mockReadStream.emit('data', '{"key":"x","val":1}\n');
      mockReadStream.emit('data', ''); // empty chunk - the key trigger
      mockReadStream.emit('end');
      mockReadStream.emit('close');
    });
  });
});