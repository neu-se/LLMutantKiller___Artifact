import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db', () => {
  it('should emit error when corrupted row at the end of the db', (done) => {
    const dbPath = 'test.dirty';
    const db = new Dirty(dbPath);
    fs.writeFileSync(dbPath, '{"key":"x","val":"y"}\n{"key":"p","val":"q"}\n{"key":"corrupted"');

    db.on('load', (length) => {
      expect(length).toBe(2);
      db.on('error', (err) => {
        expect(err.message).toBe('Corrupted row at the end of the db: {"key":"corrupted"');
        fs.unlinkSync(dbPath);
        done();
      });
    });
  });
});