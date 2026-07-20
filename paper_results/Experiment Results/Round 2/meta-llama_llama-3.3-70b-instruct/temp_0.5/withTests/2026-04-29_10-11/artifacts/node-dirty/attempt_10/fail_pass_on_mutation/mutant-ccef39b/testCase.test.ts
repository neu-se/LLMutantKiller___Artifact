import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { mkdirSync, rmSync } from 'fs';

const TMP_PATH = 'tmp';
try {
  mkdirSync(TMP_PATH);
} catch (err) {
  // Directory already exists
}

describe('Dirty', () => {
  it('should close correctly when there are pending writes and queue size is greater than 0 but inFlightWrites is 0, and then wait for a small delay and check for write_close event', (done) => {
    const file = `${TMP_PATH}/test.dirty`;
    const db = new Dirty(file);
    db.set('key1', 'value1');
    db.set('key2', undefined);
    db.close();
    let writeCloseCalled = false;
    db.on('write_close', () => {
      writeCloseCalled = true;
    });
    setTimeout(() => {
      if (!writeCloseCalled) {
        throw new Error('write_close event was not called');
      }
      rmSync(file);
      done();
    }, 100);
  });
});