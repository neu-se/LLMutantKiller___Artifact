import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should emit an error when loading a corrupted row', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('error', (err) => {
      expect(err.message).toBe('Corrupted row at the end of the db: {"key":"test2","val":null{"key":"test","val":null}');
      fs.unlinkSync(dbPath);
      done();
    });

    fs.appendFileSync(dbPath, '{"key":"test2","val":null{"key":"test","val":null}');
  });
});