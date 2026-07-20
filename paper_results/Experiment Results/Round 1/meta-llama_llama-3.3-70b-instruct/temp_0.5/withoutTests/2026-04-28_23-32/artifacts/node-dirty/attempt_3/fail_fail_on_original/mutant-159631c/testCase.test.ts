import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { mkdirSync, rmdirSync } from 'fs';

describe('Dirty', () => {
  it('emits read_close event when read stream is closed', (done) => {
    const tempDir = 'temp-test-dir';
    try {
      rmdirSync(tempDir);
    } catch (e) {}
    mkdirSync(tempDir);
    const dirty = new Dirty(`${tempDir}/test.db`);
    let readCloseEmitted = false;
    dirty.on('read_close', () => {
      readCloseEmitted = true;
    });
    dirty.close();
    setTimeout(() => {
      expect(readCloseEmitted).toBe(true);
      rmdirSync(tempDir);
      done();
    }, 100);
  });
});