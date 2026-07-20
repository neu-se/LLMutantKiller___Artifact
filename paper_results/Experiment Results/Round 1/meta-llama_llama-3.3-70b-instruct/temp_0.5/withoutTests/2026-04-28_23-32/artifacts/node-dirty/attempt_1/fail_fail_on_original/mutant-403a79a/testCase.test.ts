import { Dirty } from '../../../../../lib/dirty/dirty.js';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit an error with a meaningful message when encountering an empty line in the database', () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('error', (err) => {
      expect(err.message).toBe('Empty lines never appear in a healthy database');
    });

    dirty._readStream.emit('data', '\n');

    rimraf.sync(dbPath);
  });
});