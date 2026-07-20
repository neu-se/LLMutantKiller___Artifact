import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close behavior with pending writes', () => {
  const testFile = path.join(__dirname, 'tmp', 'close-test.dirty');
  const tmpDir = path.join(__dirname, 'tmp');

  beforeAll(() => {
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
  });

  afterAll(() => {
    try {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
      if (fs.existsSync(tmpDir)) {
        fs.rmdirSync(tmpDir);
      }
    } catch (err) {
      // Ignore cleanup errors
    }
  });

  it('should delay close until pending writes complete', (done) => {
    const db = new Dirty(testFile);

    db.on('load', () => {
      // Set multiple values to ensure we have pending writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Immediately call close while writes are pending
      db.close();

      // Verify that close was delayed and write_close event fires
      db.on('write_close', () => {
        // Verify the file was written correctly
        const content = fs.readFileSync(testFile, 'utf-8');
        const lines = content.trim().split('\n');

        expect(lines.length).toBe(2);
        expect(lines[0]).toContain('"key":"key1"');
        expect(lines[1]).toContain('"key":"key2"');

        done();
      });
    });
  });
});