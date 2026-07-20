import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';
import { rmSync } from 'fs';

describe('Dirty', () => {
  it('should emit an error when loading a corrupted database with empty lines', (done) => {
    const dbPath = 'test.db';
    fs.writeFileSync(dbPath, 'key1:val1\n\nkey2:val2\n');
    const dirty = new Dirty(dbPath);
    dirty.on('error', (err) => {
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      rmSync(dbPath);
      done();
    });
  });
});