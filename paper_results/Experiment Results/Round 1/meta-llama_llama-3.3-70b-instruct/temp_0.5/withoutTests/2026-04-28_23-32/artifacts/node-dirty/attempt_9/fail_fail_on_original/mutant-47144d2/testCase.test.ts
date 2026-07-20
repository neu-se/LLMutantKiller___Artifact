import { Dirty } from '../../../../../../lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should not emit an error when an empty line is encountered during loading in the mutated code', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    const errorSpy = jest.fn();
    dirty.on('error', errorSpy);

    fs.writeFileSync(dbPath, '\n');

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(errorSpy).toHaveBeenCalledTimes(0);

    fs.unlinkSync(dbPath);
  });
});