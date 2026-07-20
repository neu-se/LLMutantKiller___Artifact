import * as fs from 'fs';
import { EventEmitter } from 'events';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database chunk processing', () => {
  it('should correctly load data when a chunk has lastIndexOf newline at index 1', (done) => {
    const mockWriteStream = new EventEmitter() as any;
    mockWriteStream.write = () => true;
    mockWriteStream.end = (cb?: () => void) => { if (cb) cb(); };
    mockWriteStream.destroy = () => {};
    mockWriteStream.cork = () => {};
    mockWriteStream.uncork = () => {};

    const mockReadStream = new EventEmitter() as any;
    mockReadStream.destroy = () => {};

    const readStreamSpy = jest.spyOn(fs, 'createReadStream').mockReturnValue(mockReadStream);
    const writeStreamSpy = jest.spyOn(fs, 'createWriteStream').mockReturnValue(mockWriteStream);

    const db = new Dirty('/fake/path');

    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));

    db.on('load', (count: number) => {
      readStreamSpy.mockRestore();
      writeStreamSpy.mockRestore();

      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('hello')).toBe(42);
        done();
      } catch (e) {
        done(e as Error);
      }
    });

    process.nextTick(() => {
      mockReadStream.emit('data', '{"key":"hello","val":42');
      mockReadStream.emit('data', '}\n');
      mockReadStream.emit('end');
      mockReadStream.emit('close');
    });
  });
});