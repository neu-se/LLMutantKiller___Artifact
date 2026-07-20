import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior', () => {
  it('should emit close events when closing with pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    let writeCloseEmitted = false;
    let readCloseEmitted = false;

    dirty.on('write_close', () => {
      writeCloseEmitted = true;
      checkCompletion();
    });

    dirty.on('read_close', () => {
      readCloseEmitted = true;
      checkCompletion();
    });

    dirty.once('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' });
      dirty.set('key2', { value: 'test2' });

      // Force close while there are pending writes
      dirty.close();
    });

    function checkCompletion() {
      if (writeCloseEmitted && readCloseEmitted) {
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      }
    }

    dirty.on('error', (err) => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(new Error('Test timed out - close events not emitted'));
    }, 2000);
  });
});