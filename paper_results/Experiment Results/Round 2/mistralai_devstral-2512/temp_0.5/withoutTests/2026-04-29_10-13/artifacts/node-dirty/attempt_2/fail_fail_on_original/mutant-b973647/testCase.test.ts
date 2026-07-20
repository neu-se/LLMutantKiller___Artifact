import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty error event emission', () => {
  it('should emit error event with correct event name when file read fails', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const errorFile = path.join(testDir, 'error.db');

    // Create a file that will cause an error when read
    fs.writeFileSync(errorFile, 'corrupted data that will cause parse error\n');

    const dirty = new Dirty(errorFile);
    let errorEventName: string | null = null;

    dirty.on('error', (err) => {
      errorEventName = 'error';
      expect(err).toBeInstanceOf(Error);
      // Clean up
      fs.unlinkSync(errorFile);
      fs.rmdirSync(testDir);
      done();
    });

    dirty.on('load', () => {
      // This should not be called in case of error
      fs.unlinkSync(errorFile);
      fs.rmdirSync(testDir);
      done(new Error('Load event should not be emitted when error occurs'));
    });

    // Set a timeout to fail the test if neither event is emitted
    setTimeout(() => {
      fs.unlinkSync(errorFile);
      fs.rmdirSync(testDir);
      done(new Error('Test timed out waiting for events'));
    }, 1000);
  });
});