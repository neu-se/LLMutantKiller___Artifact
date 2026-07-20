import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

describe('dirty empty line error handling', () => {
  it('should emit an error event when an empty line is encountered in the database file', async () => {
    const tmpDir = os.tmpdir();
    const dbFile = path.join(tmpDir, `test-empty-line-${Date.now()}.dirty`);

    // Write a db file with an empty line in the middle
    fs.writeFileSync(dbFile, '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n', 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const errorReceived = await new Promise<Error | null>((resolve) => {
      const db = new Dirty(dbFile);
      
      let errorEmitted: Error | null = null;
      
      db.on('error', (err: Error) => {
        errorEmitted = err;
      });

      db.on('load', () => {
        resolve(errorEmitted);
      });
    });

    // Cleanup
    try { fs.unlinkSync(dbFile); } catch (e) { /* ignore */ }

    expect(errorReceived).not.toBeNull();
    expect(errorReceived).toBeInstanceOf(Error);
    expect((errorReceived as Error).message).toBe('Empty lines never appear in a healthy database');
  });
});