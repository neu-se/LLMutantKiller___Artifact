import { EventEmitter } from 'events';

// We need to control the read stream from within the test
// Use a module-level variable that the mock can reference
let capturedReadStream: EventEmitter | null = null;

jest.mock('fs', () => {
  const { EventEmitter } = require('events');
  
  const mockWriteStream = new EventEmitter();
  (mockWriteStream as any).write = () => true;
  (mockWriteStream as any).end = (cb: any) => { if (cb) cb(); };
  (mockWriteStream as any).destroy = () => {};
  (mockWriteStream as any).cork = () => {};
  (mockWriteStream as any).uncork = () => {};

  return {
    createReadStream: () => {
      const rs = new EventEmitter();
      (rs as any).destroy = () => {};
      // Store reference so test can emit events
      (global as any).__mockReadStream = rs;
      return rs;
    },
    createWriteStream: () => mockWriteStream,
  };
});

describe('Dirty database', () => {
  it('should correctly buffer partial chunks and process rows only when newline is present', (done) => {
    // Clear module cache to get fresh instance with our mock
    jest.resetModules();
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty('fake.db');
    const errors: string[] = [];

    db.on('error', (err: Error) => errors.push(err.message));

    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(2);
        expect(db.get('key1')).toBe('val1');
        expect(db.get('key2')).toBe('val2');
        done();
      } catch (err) {
        done(err);
      }
    });

    process.nextTick(() => {
      const rs = (global as any).__mockReadStream;
      // Send chunks where first chunk has no newline
      rs.emit('data', '{"key":"key1","val":"val1"}');
      rs.emit('data', '\n{"key":"key2","val":"val2"}\n');
      rs.emit('end');
      rs.emit('close');
    });
  });
});