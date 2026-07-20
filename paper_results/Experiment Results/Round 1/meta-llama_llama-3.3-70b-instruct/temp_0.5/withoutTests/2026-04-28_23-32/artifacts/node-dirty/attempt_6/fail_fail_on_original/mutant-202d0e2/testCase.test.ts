import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should emit "drain" event after writing data to the file', (done) => {
    const filePath = path.join(__dirname, 'test.db');
    const dirty = new Dirty(filePath);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        let drainCalled = false;
        dirty.on('drain', () => {
          drainCalled = true;
        });
        setTimeout(() => {
          if (drainCalled) {
            fs.unlinkSync(filePath);
            done();
          } else {
            expect(drainCalled).toBe(true);
            done();
          }
        }, 1000); // Increased timeout to 1 second
      });
    });
  });
});