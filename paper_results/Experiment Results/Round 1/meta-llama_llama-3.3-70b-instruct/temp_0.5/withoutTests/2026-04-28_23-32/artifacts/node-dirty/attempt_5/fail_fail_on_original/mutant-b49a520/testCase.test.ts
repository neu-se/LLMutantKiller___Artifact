import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rmSync } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should handle chunk with newline character', () => {
    const dbPath = join(__dirname, 'test.db');
    rmSync(dbPath, { force: true });
    const dirty = new Dirty(dbPath);

    // Write a chunk with a newline character to the database file
    const fs = require('fs');
    fs.appendFileSync(dbPath, 'key:"value"\nkey2:"value2"');

    dirty.on('load', () => {
      expect(dirty.get('key')).toBe('value');
      expect(dirty.get('key2')).toBe('value2');
    });
  });
});