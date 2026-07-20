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
    let errorReceived = false;

    dirty.on('error', (err) => {
      errorEventName = 'error';
      errorReceived = true;
      expect(err).toBeInstanceOf(Error);
      // Clean up in next tick to avoid race conditions
      setImmediate(() => {
        try {
          fs.unlinkSync(errorFile);
          fs.rmdirSync(testDir);
        } catch (e) {
          // Ignore cleanup errors
        }
        done();
      });
    });

    dirty.on('', (err) => {
      errorEventName = '';
      errorReceived = true;
      // This should not be called in the original code
      setImmediate(() => {
        try {
          fs.unlinkSync(errorFile);
          fs.rmdirSync(testDir);
        } catch (e) {
          // Ignore cleanup errors
        }
        done(new Error('Empty string event should not be emitted in original code'));
      });
    });

    // Set a timeout to fail the test if neither event is emitted
    setTimeout(() => {
      try {
        fs.unlinkSync(errorFile);
        fs.rmdirSync(testDir);
      } catch (e) {
        // Ignore cleanup errors
      }
      done(new Error('Test timed out waiting for events'));
    }, 1000);
  });
});