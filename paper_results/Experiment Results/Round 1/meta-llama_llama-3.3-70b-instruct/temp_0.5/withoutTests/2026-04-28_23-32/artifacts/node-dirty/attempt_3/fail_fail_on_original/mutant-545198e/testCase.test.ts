import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should handle chunks without newline characters correctly', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Write a chunk with a newline character to the database file
    fs.writeFileSync(dbPath, 'key1{"key":"key1","val":"val1"}\nkey2{"key":"key2","val":"val2"}');

    // Wait for the 'load' event to ensure the chunk is processed
    return new Promise((resolve) => {
      dirty.once('load', () => {
        // Check if the data is loaded correctly
        expect(dirty.get('key1')).toBe('val1');
        expect(dirty.get('key2')).toBe('val2');
        resolve();
      });
    }).then(() => {
      // Clean up
      fs.unlinkSync(dbPath);
    });
  });
});