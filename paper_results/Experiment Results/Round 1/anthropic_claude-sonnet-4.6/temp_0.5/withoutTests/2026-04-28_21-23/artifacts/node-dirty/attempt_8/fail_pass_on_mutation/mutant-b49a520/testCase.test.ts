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
  it('should emit corrupted row error when file has no trailing newline', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty('fake.db');
    const errors: string[] = [];

    db.on('error', (err: Error) => errors.push(err.message));

    db.on('load', () => {
      try {
        expect(errors).toHaveLength(1);
        expect(errors[0]).toContain('Corrupted row at the end');
        done();
      } catch (err) {
        done(err);
      }
    });

    process.nextTick(() => {
      // A chunk with no newline - file doesn't end with newline
      mockReadStream.emit('data', '{"key":"a","val":1}');
      mockReadStream.emit('end');
      mockReadStream.emit('close');
    });
  });
});