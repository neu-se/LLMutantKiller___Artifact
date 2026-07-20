import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event after write stream backpressure', () => {
  it('should emit drain event when write stream drains with empty queue and no in-flight writes', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');

    try {
      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(file);
        const timeout = setTimeout(() => {
          reject(new Error('Timed out waiting for drain event'));
        }, 5000);

        db.on('load', () => {
          // Write many large records to force write stream backpressure
          // This should trigger _waitForDrain = true, causing the drain handler
          // to be invoked later with an empty queue
          const largeValue = 'x'.repeat(65536); // 64KB per record
          let drainReceived = false;

          db.on('drain', () => {
            drainReceived = true;
            clearTimeout(timeout);
            resolve();
          });

          // Write enough data to potentially cause backpressure
          for (let i = 0; i < 20; i++) {
            db.set(`key${i}`, largeValue);
          }
        });

        db.on('error', (err: Error) => {
          clearTimeout(timeout);
          reject(err);
        });
      });
    } finally {
      rimrafSync(tmpDir);
    }
  });
});