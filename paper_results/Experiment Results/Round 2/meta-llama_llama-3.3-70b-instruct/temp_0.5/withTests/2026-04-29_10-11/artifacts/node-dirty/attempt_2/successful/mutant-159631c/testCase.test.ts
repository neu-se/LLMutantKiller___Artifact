import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { mkdirSync, existsSync } from 'fs';

const TMP_PATH = './tmp';
if (!existsSync(TMP_PATH)) {
  mkdirSync(TMP_PATH);
}

describe('Dirty', () => {
  it('should emit "read_close" event when _readStream is closed', (done) => {
    const db = new Dirty(`${TMP_PATH}/test.dirty`);
    db.on('load', () => {
      db.on('read_close', () => {
        done();
      });
      db.close();
    });
  });
});