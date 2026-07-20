import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event triggers flush of remaining queue', () => {
  it('should call all callbacks when multiple sets cause backpressure', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(file);
    const callbacksCalled: number[] = [];
    const totalWrites = 100;

    db.on('load', () => {
      // Write many large records to force backpressure/drain cycles
      const largeValue = 'x'.repeat(65536); // 64KB per record to force drain

      let completed = 0;
      for (let i = 0; i < totalWrites; i++) {
        const idx = i;
        db.set(`key${idx}`, largeValue, (err: Error | null) => {
          callbacksCalled.push(idx);
          completed++;
          if (completed === totalWrites) {
            // All callbacks were called - verify all writes completed
            expect(callbacksCalled.length).toBe(totalWrites);
            rimrafSync(tmpDir);
            done();
          }
        });
      }
    });

    // Timeout safety - if not all callbacks fire, test fails
    setTimeout(() => {
      rimrafSync(tmpDir);
      done(new Error(`Only ${callbacksCalled.length} of ${totalWrites} callbacks were called`));
    }, 10000);
  });
});