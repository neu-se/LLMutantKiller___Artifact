import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit "drain" event when there are no in-flight writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          expect(true).toBe(true);
          fs.unlink(dbPath, () => {
            done();
          });
        });
        dirty.on('error', (err) => {
          expect(err).toBeUndefined();
          done();
        });
      });
    });
  });
});