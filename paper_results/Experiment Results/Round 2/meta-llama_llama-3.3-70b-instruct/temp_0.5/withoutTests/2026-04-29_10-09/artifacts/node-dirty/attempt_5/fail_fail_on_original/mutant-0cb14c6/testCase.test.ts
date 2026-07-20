import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit drain event when _inFlightWrites is 0', (done) => {
    const dbPath = path.join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);
    dirty._inFlightWrites = 0;
    let drainEmitted = false;
    dirty.on('drain', () => {
      drainEmitted = true;
    });
    dirty._writeStream = {
      on: () => {},
      cork: () => {},
      uncork: () => {},
      write: () => {},
      destroy: () => {},
      emit: () => {}
    };
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
});