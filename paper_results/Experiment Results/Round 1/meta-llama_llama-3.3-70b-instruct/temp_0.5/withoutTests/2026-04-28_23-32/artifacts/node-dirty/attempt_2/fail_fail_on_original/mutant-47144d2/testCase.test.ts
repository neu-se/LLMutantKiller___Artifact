import { Dirty } from '../../../../../lib/dirty/dirty.js';
import { fs } from 'fs';
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('should emit an error when an empty line is encountered during loading', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    const errorSpy = jest.fn();
    dirty.on('error', errorSpy);

    fs.writeFileSync(dbPath, '\n');

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy.mock.calls[0][0].message).toBe('Empty lines never appear in a healthy database');

    rimraf.sync(dbPath);
  });
});