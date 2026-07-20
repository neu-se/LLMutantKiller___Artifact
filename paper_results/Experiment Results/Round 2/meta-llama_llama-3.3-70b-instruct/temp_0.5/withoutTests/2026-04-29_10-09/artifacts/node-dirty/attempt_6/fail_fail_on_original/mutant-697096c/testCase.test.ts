import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';
import { rmSync } from 'fs';

describe('Dirty', () => {
  it('should emit an error when loading a corrupted database with empty lines', (done) => {
    const dbPath = 'test.db';
    fs.writeFileSync(dbPath, '\n');
    const dirty = new Dirty(dbPath);
    let loadCalled = false;
    dirty.on('load', () => {
      loadCalled = true;
      rmSync(dbPath);
      expect(loadCalled).toBe(true);
      done();
    });
    dirty.on('error', (err) => {
      rmSync(dbPath);
      expect(loadCalled).toBe(false);
      done();
    });
  });
});