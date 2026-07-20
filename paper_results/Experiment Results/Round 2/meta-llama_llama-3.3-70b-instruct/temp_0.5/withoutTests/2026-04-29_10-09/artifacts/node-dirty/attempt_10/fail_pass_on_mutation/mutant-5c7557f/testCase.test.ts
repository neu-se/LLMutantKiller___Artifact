import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit drain event when queue is empty and there are no in-flight writes', () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.set('key', undefined, () => {
          dirty.once('drain', () => {
            dirty.close();
            expect(dirty._queue.size).toBe(0);
            expect(dirty._inFlightWrites).toBe(0);
          });
        });
      });
    });
  });
});