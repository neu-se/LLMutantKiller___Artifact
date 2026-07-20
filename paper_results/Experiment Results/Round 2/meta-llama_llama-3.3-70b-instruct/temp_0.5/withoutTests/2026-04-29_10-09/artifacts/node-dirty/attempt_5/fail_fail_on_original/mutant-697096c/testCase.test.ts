import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';
import { rmSync } from 'fs';

describe('Dirty', () => {
  it('should emit an error when loading a corrupted database with empty lines', (done) => {
    const dbPath = 'test.db';
    fs.writeFileSync(dbPath, '\n');
    const dirty = new Dirty(dbPath);
    let errorEmitted = false;
    dirty.on('error', (err) => {
      errorEmitted = true;
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      rmSync(dbPath);
      done();
    });
    dirty.on('load', () => {
      if (!errorEmitted) {
        expect(true).toBe(false);
      }
      rmSync(dbPath);
      done();
    });
  });
});