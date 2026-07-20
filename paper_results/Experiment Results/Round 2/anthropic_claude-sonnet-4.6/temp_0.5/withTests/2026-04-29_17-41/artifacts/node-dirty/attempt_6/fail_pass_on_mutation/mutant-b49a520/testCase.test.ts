import * as path from 'path';
import { EventEmitter } from 'events';

describe('dirty', () => {
  it('should correctly load records when data arrives in chunks without newlines', (done) => {
    jest.resetModules();

    const mockReadEmitter = new EventEmitter() as any;
    mockReadEmitter.destroy = jest.fn();

    const mockWriteEmitter = new EventEmitter() as any;
    mockWriteEmitter.write = jest.fn(() => true);
    mockWriteEmitter.end = jest.fn((cb?: () => void) => { if (cb) cb(); });
    mockWriteEmitter.cork = jest.fn();
    mockWriteEmitter.uncork = jest.fn();
    mockWriteEmitter.destroy = jest.fn();

    jest.doMock('fs', () => ({
      createReadStream: jest.fn(() => mockReadEmitter),
      createWriteStream: jest.fn(() => mockWriteEmitter),
    }));

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty('/fake/path.dirty');

    process.nextTick(() => {
      // Emit a chunk with a newline, then an empty chunk
      // After first chunk: buffer='', key 'x' parsed
      // Empty chunk arrives:
      //   Original: lastIndexOf('\n')===-1 → early return (skip split/parse)
      //   Mutated: lastIndexOf("")===0 ≠ -1 → no early return (run split/parse, but it's no-op)
      // Then end: buffer='' → load(1)
      // Both should give load(1)... 
      // Let me try a different sequence
      
      // Chunk 1: partial record (no newline)
      // Chunk 2: rest of record + newline
      const row = '{"key":"x","val":"y"}\n';
      const mid = Math.floor(row.length / 2);
      mockReadEmitter.emit('data', row.slice(0, mid));  // no \n
      mockReadEmitter.emit('data', row.slice(mid));      // has \n
      mockReadEmitter.emit('end');
      mockReadEmitter.emit('close');
    });

    db.on('load', (length: number) => {
      expect(length).toBe(1);
      expect(db.get('x')).toBe('y');
      done();
    });

    db.on('error', (err: Error) => {
      done(err);
    });
  });
});