import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';
import { rmSync } from 'fs';

describe('Dirty', () => {
  it('should emit an error when loading a corrupted database with empty lines', (done) => {
    const dbPath = 'test.db';
    fs.writeFileSync(dbPath, 'key1:val1\n\nkey2:val2\n');
    const dirty = new Dirty(dbPath);
    let loadCalled = false;
    dirty.on('load', () => {
      loadCalled = true;
    });
    dirty.on('error', (err) => {
      expect(err.message).toBe('Could not load corrupted row: key2:val2');
      rmSync(dbPath);
      expect(loadCalled).toBe(true);
      done();
    });
  });
});