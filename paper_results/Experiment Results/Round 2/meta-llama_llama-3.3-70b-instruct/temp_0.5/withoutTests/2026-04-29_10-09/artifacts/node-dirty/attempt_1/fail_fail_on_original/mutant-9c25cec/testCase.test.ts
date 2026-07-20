import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit an error when loading a corrupted row', (done) => {
    const dbPath = 'test.db';
    fs.writeFileSync(dbPath, '{"key": "value"}\n{}');
    const dirty = new Dirty(dbPath);
    dirty.on('error', (err) => {
      expect(err.message).toBe('Could not load corrupted row: {}');
      rimraf.sync(dbPath);
      done();
    });
  });
});