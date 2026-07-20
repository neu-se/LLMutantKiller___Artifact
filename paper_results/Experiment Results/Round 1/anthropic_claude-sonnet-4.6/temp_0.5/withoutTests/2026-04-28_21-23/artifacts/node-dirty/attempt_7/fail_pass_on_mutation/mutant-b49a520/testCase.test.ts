import { EventEmitter } from 'events';

const mockReadStream = new EventEmitter() as any;
mockReadStream.destroy = jest.fn();

const mockWriteStream = new EventEmitter() as any;
mockWriteStream.write = jest.fn(() => true);
mockWriteStream.end = jest.fn((cb: any) => { if (cb) cb(); return mockWriteStream; });
mockWriteStream.destroy = jest.fn();
mockWriteStream.cork = jest.fn();
mockWriteStream.uncork = jest.fn();

jest.mock('fs', () => ({
  createReadStream: () => mockReadStream,
  createWriteStream: () => mockWriteStream,
}));

describe('Dirty database', () => {
  it('should correctly load rows when data arrives in chunks split at newline boundaries', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty('fake.db');
    const errors: string[] = [];

    db.on('error', (err: Error) => errors.push(err.message));

    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(3);
        expect(db.get('key1')).toBe('val1');
        expect(db.get('key2')).toBe('val2');
        expect(db.get('key3')).toBe('val3');
        done();
      } catch (err) {
        done(err);
      }
    });

    process.nextTick(() => {
      // Chunk 1: partial row, no newline
      mockReadStream.emit('data', '{"key":"key1","val":"val1"}');
      // Chunk 2: completes row 1 and has row 2 complete, plus partial row 3
      mockReadStream.emit('data', '\n{"key":"key2","val":"val2"}\n{"key":"key3","val":"val3"}');
      // Chunk 3: just the newline to complete row 3
      mockReadStream.emit('data', '\n');
      mockReadStream.emit('end');
      mockReadStream.emit('close');
    });
  });
});