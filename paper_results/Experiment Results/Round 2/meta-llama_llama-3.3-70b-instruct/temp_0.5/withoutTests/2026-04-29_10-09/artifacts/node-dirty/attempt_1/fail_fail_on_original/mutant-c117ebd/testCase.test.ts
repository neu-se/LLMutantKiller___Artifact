import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('Dirty', () => {
  it('should write data in utf-8 encoding', () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.set('key', 'value', () => {
      dirty.close();
    });

    // Wait for the write operation to complete
    dirty.on('drain', () => {
      // Read the written data
      const data = fs.readFileSync(dbPath, 'utf-8');
      expect(data).toContain('{"key":"value"}');
      rimraf.sync(dbPath);
    });
  });
});