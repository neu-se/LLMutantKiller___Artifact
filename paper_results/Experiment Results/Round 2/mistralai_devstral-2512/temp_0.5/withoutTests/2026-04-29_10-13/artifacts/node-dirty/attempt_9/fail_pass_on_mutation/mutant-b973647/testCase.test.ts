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
    const events: Array<{name: string, args: any[]}> = [];

    // Capture all events
    dirty.on('error', (err) => {
      events.push({name: 'error', args: [err]});
    });

    dirty.on('', (err) => {
      events.push({name: '', args: [err]});
    });

    // Check events after a short delay
    setTimeout(() => {
      try {
        fs.unlinkSync(errorFile);
        fs.rmdirSync(testDir);
      } catch (e) {
        // Ignore cleanup errors
      }

      // Should have exactly one 'error' event in original code
      const errorEvents = events.filter(e => e.name === 'error');
      const emptyEvents = events.filter(e => e.name === '');

      expect(errorEvents.length).toBe(1);
      expect(emptyEvents.length).toBe(0);
      expect(errorEvents[0].args[0]).toBeInstanceOf(Error);
      done();
    }, 100);
  });
});