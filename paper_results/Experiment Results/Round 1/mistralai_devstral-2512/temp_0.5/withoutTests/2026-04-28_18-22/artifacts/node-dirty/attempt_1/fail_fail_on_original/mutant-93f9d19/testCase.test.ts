import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database error event emission', () => {
  it('should emit error event with correct event name when corrupted row at end of file', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');

    // Create a corrupted database file with incomplete row at the end
    fs.writeFileSync(dbPath, '{"key":"test","val":123\n{"key":"corrupted","val":456');

    const dirty = new Dirty(dbPath);

    // Listen for error event to verify it's emitted with correct name
    dirty.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Corrupted row at the end of the db');
      done();
    });

    // Clean up
    dirty.on('load', () => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
    });
  });
});