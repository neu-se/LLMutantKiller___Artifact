import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should throw an error when _inFlightWrites is negative', (done) => {
    const dbPath = path.join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);
    dirty._inFlightWrites = -1;
    dirty._writeStream = {
      on: () => {},
      cork: () => {},
      uncork: () => {},
      write: () => {},
      destroy: () => {}
    };
    dirty._flush = () => {
      dirty._writeStream.on('drain', () => {
        if (dirty._inFlightWrites < 0) {
          expect(true).toBe(false); // This should not be reached
        } else {
          done();
        }
      });
      dirty._writeStream.emit('drain');
    };
    dirty._flush();
  });
});