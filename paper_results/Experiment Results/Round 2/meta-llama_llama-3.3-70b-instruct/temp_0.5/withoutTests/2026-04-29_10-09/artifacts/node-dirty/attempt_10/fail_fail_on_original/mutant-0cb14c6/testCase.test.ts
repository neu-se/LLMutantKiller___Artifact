import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not emit drain event when _inFlightWrites is negative', (done) => {
    const dbPath = path.join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);
    let drainEmitted = false;
    dirty.on('drain', () => {
      drainEmitted = true;
    });
    dirty.set('key', 'value', () => {
      dirty._inFlightWrites = -1;
      dirty._writeStream.emit('drain');
      setTimeout(() => {
        expect(drainEmitted).toBe(false);
        dirty.set('key2', 'value2', () => {
          dirty._inFlightWrites = 0;
          dirty._writeStream.emit('drain');
          setTimeout(() => {
            expect(drainEmitted).toBe(true);
            fs.unlink(dbPath, (err) => {
              if (err) {
                done(err);
              } else {
                done();
              }
            });
          }, 100);
        });
      }, 100);
    });
  });
});