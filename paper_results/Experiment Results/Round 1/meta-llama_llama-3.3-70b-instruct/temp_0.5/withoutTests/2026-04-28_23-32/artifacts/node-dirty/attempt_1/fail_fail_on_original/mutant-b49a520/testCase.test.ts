import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rmSync } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should handle chunk without newline character', () => {
    const dbPath = join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.close();
      });
    });

    // Write a chunk without a newline character to the database file
    const fs = require('fs');
    fs.appendFileSync(dbPath, 'key:"value"');

    // Check if the database is loaded correctly
    dirty.on('load', () => {
      expect(dirty.get('key')).toBe('value');
    });
  });
});