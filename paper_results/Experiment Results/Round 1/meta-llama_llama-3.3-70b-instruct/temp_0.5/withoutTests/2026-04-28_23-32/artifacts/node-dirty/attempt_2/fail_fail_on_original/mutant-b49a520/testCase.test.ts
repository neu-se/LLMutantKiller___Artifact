import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rmSync } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should handle chunk with newline character', () => {
    const dbPath = join(__dirname, 'test.db');
    rmSync(dbPath, { force: true });
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.close();
      });
    });

    // Write a chunk with a newline character to the database file
    const fs = require('fs');
    fs.appendFileSync(dbPath, 'key:"value"\n');

    // Check if the database is loaded correctly
    dirty.on('load', () => {
      expect(dirty.get('key')).toBe('value');
    });

    // Simulate a chunk without a newline character
    fs.appendFileSync(dbPath, 'key2:"value2"');

    // The original code should handle this chunk correctly
    // The mutated code should not handle this chunk correctly and throw an error
    dirty.on('error', (err) => {
      throw new Error('Error occurred while loading database');
    });
  });
});