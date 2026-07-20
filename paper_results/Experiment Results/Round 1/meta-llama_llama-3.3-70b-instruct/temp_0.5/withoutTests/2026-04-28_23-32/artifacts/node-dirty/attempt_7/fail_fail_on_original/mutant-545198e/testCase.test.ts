import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should handle chunks without newline characters correctly', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Write a chunk without a newline character to the database file
    fs.writeFileSync(dbPath, '{"key":"key1","val":"val1"}{"key":"key2","val":"val2"}');

    dirty.on('load', () => {
      // Check if the data is loaded correctly
      expect(dirty.get('key1')).toBeUndefined();
      expect(dirty.get('key2')).toBeUndefined();
      // Clean up
      fs.unlinkSync(dbPath);
      done();
    });
  }, 10000);
});