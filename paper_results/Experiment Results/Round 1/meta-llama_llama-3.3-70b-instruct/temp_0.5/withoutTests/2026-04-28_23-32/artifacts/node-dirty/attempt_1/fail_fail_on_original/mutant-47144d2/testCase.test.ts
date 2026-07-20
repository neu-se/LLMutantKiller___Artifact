import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('should emit an error when an empty line is encountered during loading', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('error', (err) => {
      expect(err.message).toBe('Empty lines never appear in a healthy database');
    });

    dirty.on('load', () => {
      rimraf.sync(dbPath);
    });

    fs.writeFileSync(dbPath, '\n');
  });
});