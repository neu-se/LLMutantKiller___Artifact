import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit an error with a meaningful message when encountering an empty line in the database', () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    const errorMessageSpy = jest.fn();
    dirty.on('error', (err) => {
      errorMessageSpy(err.message);
    });

    dirty._readStream.emit('data', '\n');

    expect(errorMessageSpy).toHaveBeenCalledTimes(1);
    expect(errorMessageSpy.mock.calls[0][0]).not.toBe('');

    rimraf.sync(dbPath);
  });
});