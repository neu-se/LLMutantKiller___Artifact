import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import { mkdirSync } from 'fs';

const TMP_PATH = 'tmp';
mkdirSync(TMP_PATH);

describe('Dirty', () => {
  it('should close correctly when there are pending writes and queue size is greater than 0', (done) => {
    const file = `${TMP_PATH}/test.dirty`;
    const db = new Dirty(file);
    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.on('drain', () => {
      db.close();
      db.on('write_close', () => {
        rimraf(TMP_PATH, () => {
          done();
        });
      });
    });
  });
});