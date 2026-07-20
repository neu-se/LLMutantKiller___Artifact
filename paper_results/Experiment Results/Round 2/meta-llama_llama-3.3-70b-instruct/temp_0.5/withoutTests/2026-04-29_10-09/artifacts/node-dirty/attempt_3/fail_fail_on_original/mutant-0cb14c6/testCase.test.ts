import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit drain event when all writes are completed', (done) => {
    const dbPath = path.join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);
    dirty.on('drain', () => {
      expect(dirty._inFlightWrites).toBeGreaterThanOrEqual(0);
      fs.unlink(dbPath, (err) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    dirty.set('key', 'value');
    dirty.set('key2', 'value2');
    dirty._inFlightWrites = -1;
  });
});