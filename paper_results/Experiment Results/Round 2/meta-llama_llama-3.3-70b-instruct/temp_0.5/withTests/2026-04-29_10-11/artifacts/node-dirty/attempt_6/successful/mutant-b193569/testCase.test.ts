import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty database', () => {
  it('should emit an error event when a corrupted row is found at the end of the database file', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    // Create a corrupted database file
    fs.writeFileSync(filePath, '{"key":"test","val":"value"}\n{"key":"test2"');

    let errorEmitted = false;
    db.on('error', (err) => {
      errorEmitted = true;
      expect(err.message).toContain('Corrupted row at the end of the db');
      done();
    });

    db.on('load', () => {
      if (!errorEmitted) {
        done(new Error('Expected an error event to be emitted'));
      }
    });
  });
});