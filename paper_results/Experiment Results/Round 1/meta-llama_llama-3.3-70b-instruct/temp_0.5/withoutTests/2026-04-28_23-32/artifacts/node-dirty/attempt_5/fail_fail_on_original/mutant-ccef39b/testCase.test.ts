import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should close the db file streams correctly when there are pending writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
        dirty.close();
      });
    });

    dirty.once('close', () => {
      expect(dirty._queue.size).toBe(0);
      expect(dirty._inFlightWrites).toBe(0);
      done();
    });
  });
});