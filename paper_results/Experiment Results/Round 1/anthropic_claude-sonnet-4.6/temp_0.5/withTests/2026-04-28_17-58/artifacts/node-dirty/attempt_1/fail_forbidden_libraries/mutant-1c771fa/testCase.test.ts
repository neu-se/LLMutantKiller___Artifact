import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty corrupted row error handling', () => {
  it('should emit an error event when a corrupted row is encountered in the database file', async () => {
    const tmpDir = os.tmpdir();
    const testFile = path.join(tmpDir, `test-corrupted-${Date.now()}.dirty`);

    // Write a file with a valid row followed by a corrupted row
    const validRow = JSON.stringify({ key: 'foo', val: 'bar' }) + '\n';
    const corruptedRow = 'this is not valid json\n';
    fs.writeFileSync(testFile, validRow + corruptedRow, 'utf-8');

    try {
      const errorEvents: Error[] = [];

      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(testFile);

        db.on('error', (err: Error) => {
          errorEvents.push(err);
        });

        db.on('load', () => {
          // In original code, an error should have been emitted for the corrupted row
          // In mutated code, the error is silently swallowed
          if (errorEvents.length > 0) {
            expect(errorEvents[0].message).toContain('Could not load corrupted row');
            resolve();
          } else {
            reject(new Error('Expected an error event for corrupted row, but none was emitted'));
          }
        });
      });
    } finally {
      try {
        fs.unlinkSync(testFile);
      } catch (e) {
        // ignore cleanup errors
      }
    }
  });
});