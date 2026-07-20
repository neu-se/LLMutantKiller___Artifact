import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';
import { rmSync } from 'fs';

describe('Dirty', () => {
  it('should emit an error when loading a corrupted database with empty lines', (done) => {
    const dbPath = 'test.db';
    fs.writeFileSync(dbPath, '\nkey1:val1\n');
    const dirty = new Dirty(dbPath);
    let errorEmitted = false;
    dirty.on('error', (err) => {
      errorEmitted = true;
    });
    dirty.on('load', () => {
      if (errorEmitted) {
        expect(dirty.size()).toBe(0);
      } else {
        expect(dirty.size()).toBe(1);
      }
      rmSync(dbPath);
      done();
    });
  });
});