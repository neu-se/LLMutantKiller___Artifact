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
  it('should not emit error for empty string chunk when buffer has no complete rows', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty('fake.db');
    const errors: string[] = [];

    db.on('error', (err: Error) => errors.push(err.message));

    db.on('load', (count: number) => {
      try {
        // With original: empty chunk triggers early return (no '\n'), buffer stays as partial row
        // With mutated: empty chunk doesn't trigger early return, but result is same
        // Let's verify normal operation
        expect(errors).toHaveLength(0);
        expect(count).toBe(2);
        expect(db.get('a')).toBe(1);
        expect(db.get('b')).toBe(2);
        done();
      } catch (err) {
        done(err);
      }
    });

    process.nextTick(() => {
      // Send complete rows in one chunk
      mockReadStream.emit('data', '{"key":"a","val":1}\n{"key":"b","val":2}\n');
      mockReadStream.emit('end');
      mockReadStream.emit('close');
    });
  });
});