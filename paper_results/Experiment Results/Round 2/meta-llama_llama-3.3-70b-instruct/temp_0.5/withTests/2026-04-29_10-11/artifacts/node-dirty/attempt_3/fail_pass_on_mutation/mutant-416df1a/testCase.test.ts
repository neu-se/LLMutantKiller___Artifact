import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty database error handling', () => {
  it('should not emit error when writing to disk succeeds and callbacks are present', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.on('error', () => {
        done.fail('Error event should not be emitted');
      });

      db.set('key', 'value', () => {
        done();
      });
    });
  });
});