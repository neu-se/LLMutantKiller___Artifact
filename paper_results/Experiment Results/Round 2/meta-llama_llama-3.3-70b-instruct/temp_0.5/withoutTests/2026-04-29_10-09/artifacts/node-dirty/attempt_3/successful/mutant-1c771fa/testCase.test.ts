import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should emit an error when loading corrupted row', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Create a corrupted row in the database
    fs.writeFileSync(dbPath, 'Invalid JSON\n');

    let loaded = false;
    dirty.on('load', () => {
      loaded = true;
    });

    dirty.on('error', (err: any) => {
      expect(err.message).toBe('Could not load corrupted row: Invalid JSON');
      expect(loaded).toBe(false);
      fs.unlinkSync(dbPath);
      done();
    });

    setTimeout(() => {
      if (!loaded) {
        expect(1).toBe(2); // If we reach this point, it means the 'load' event was not emitted
        done();
      }
    }, 1000);
  });
});