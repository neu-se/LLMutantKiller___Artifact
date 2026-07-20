import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';

describe('Dirty', () => {
  it('should wait for pending writes to finish before closing', (done) => {
    const filePath = 'test.db';
    const dirty = new Dirty(filePath);

    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
        dirty.close();

        // If the write stream is closed before the pending writes are finished,
        // the 'write_close' event will be emitted before the 'drain' event.
        let drainEmitted = false;

        dirty.once('write_close', () => {
          if (drainEmitted) {
            done();
          } else {
            expect(true).toBe(false);
          }
        });

        dirty.once('drain', () => {
          drainEmitted = true;
        });
      });
    });
  });
});