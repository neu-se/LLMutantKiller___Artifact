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
  it('should correctly load a row split across two chunks where first chunk has no newline', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const errors: string[] = [];
    const db = new Dirty('fake.db');

    db.on('error', (err: Error) => {
      errors.push(err.message);
    });

    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('x')).toBe(1);
        done();
      } catch (err) {
        done(err);
      }
    });

    process.nextTick(() => {
      // First chunk has no newline - partial row
      mockReadStream.emit('data', '{"key":"x","val":1}');
      // Second chunk completes the row with newline
      mockReadStream.emit('data', '\n');
      mockReadStream.emit('end');
      mockReadStream.emit('close');
    });
  });
});