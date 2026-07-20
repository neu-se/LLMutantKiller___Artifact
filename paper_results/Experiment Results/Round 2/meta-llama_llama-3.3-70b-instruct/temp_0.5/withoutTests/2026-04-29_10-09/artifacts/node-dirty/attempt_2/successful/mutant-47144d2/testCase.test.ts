import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should emit an error for empty lines in the database', (done) => {
    const dbPath = 'test.db';
    fs.writeFileSync(dbPath, '\n');
    const dirty = new Dirty(dbPath);
    let errorEmitted = false;
    dirty.on('error', (err) => {
      errorEmitted = true;
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      done();
    });
    dirty.on('load', () => {
      if (!errorEmitted) {
        done(new Error('No error emitted for empty line in database'));
      }
    });
  });
});