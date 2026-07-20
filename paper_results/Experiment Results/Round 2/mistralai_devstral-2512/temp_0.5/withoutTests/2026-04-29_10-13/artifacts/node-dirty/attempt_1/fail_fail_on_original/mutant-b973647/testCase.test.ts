import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty error event emission', () => {
  it('should emit error event with correct event name when file read fails', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const testFile = path.join(testDir, 'test.db');
    const errorFile = path.join(testDir, 'error.db');

    // Create a file that will cause an error when read (e.g., permission denied)
    fs.writeFileSync(errorFile, 'test', { mode: 0o000 });

    const dirty = new Dirty(errorFile);

    dirty.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      // Clean up
      fs.chmodSync(errorFile, 0o644);
      fs.unlinkSync(errorFile);
      fs.rmdirSync(testDir);
      done();
    });

    dirty.on('load', () => {
      // This should not be called in case of error
      fs.chmodSync(errorFile, 0o644);
      fs.unlinkSync(errorFile);
      fs.rmdirSync(testDir);
      done(new Error('Load event should not be emitted when error occurs'));
    });
  });
});