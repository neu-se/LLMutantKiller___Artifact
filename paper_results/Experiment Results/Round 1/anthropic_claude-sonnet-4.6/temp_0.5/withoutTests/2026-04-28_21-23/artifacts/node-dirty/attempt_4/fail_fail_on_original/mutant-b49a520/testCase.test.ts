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

describe('Dirty database chunk handling', () => {
  it('should return early on empty chunk (no newline), leaving complete rows in buffer until end event causes error', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const errors: string[] = [];
    const db = new Dirty('fake.db');

    db.on('error', (err: Error) => {
      errors.push(err.message);
    });

    db.on('load', (count: number) => {
      try {
        // Original: empty chunk has no '\n', so lastIndexOf('\n') === -1, returns early
        // Buffer retains '{"key":"x","val":1}\n' -> end event sees non-empty buffer -> error emitted, count=0
        //
        // Mutated: lastIndexOf("") is never -1, so never returns early
        // Empty chunk causes buffer to be split/processed -> row loaded, buffer empty at end -> no error, count=1
        expect(errors.length).toBeGreaterThan(0);
        expect(count).toBe(0);
        done();
      } catch (err) {
        done(err);
      }
    });

    process.nextTick(() => {
      mockReadStream.emit('data', '{"key":"x","val":1}\n');
      mockReadStream.emit('data', ''); // empty chunk triggers the behavioral difference
      mockReadStream.emit('end');
      mockReadStream.emit('close');
    });
  });
});