import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { mkdirSync, rmdirSync } from 'fs';

describe('Dirty', () => {
  it('emits read_close event when read stream is closed', (done) => {
    const tempDir = 'temp-test-dir';
    mkdirSync(tempDir);
    const dirty = new Dirty(`${tempDir}/test.db`);
    dirty.on('read_close', () => {
      rmdirSync(tempDir);
      done();
    });
    dirty.close();
  });
});