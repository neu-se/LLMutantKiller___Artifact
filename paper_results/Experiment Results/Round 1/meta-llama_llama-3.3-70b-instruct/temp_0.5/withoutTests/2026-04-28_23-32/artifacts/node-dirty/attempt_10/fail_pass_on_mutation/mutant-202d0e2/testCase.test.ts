import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should emit "drain" event after writing data to the file', (done) => {
    const filePath = path.join(__dirname, 'test.db');
    const dirty = new Dirty(filePath);

    dirty.on('load', () => {
      dirty.set('key', 'value');
      let drainCalled = false;
      dirty.on('drain', () => {
        drainCalled = true;
      });
      setTimeout(() => {
        expect(drainCalled).toBe(true);
        fs.unlinkSync(filePath);
        done();
      }, 2000); // Increased timeout to 2 seconds
    });
  }, 3000); // Increased test timeout to 3 seconds
});