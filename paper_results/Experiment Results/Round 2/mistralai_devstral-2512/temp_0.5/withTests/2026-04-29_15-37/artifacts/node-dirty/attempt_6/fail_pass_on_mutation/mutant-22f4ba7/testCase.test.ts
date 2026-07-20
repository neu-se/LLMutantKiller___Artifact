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

  it('should wait for pending writes before closing', (done) => {
    const db = new Dirty(testFile);
    let events: string[] = [];

    db.on('load', () => {
      // Set multiple values to ensure we have pending writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Track events
      db.on('drain', () => events.push('drain'));
      db.on('write_close', () => events.push('write_close'));
      db.on('read_close', () => events.push('read_close'));

      // Immediately call close while writes are pending
      db.close();

      // Check after a short delay that events fired in correct order
      setTimeout(() => {
        expect(events).toContain('drain');
        expect(events).toContain('write_close');
        expect(events).toContain('read_close');

        // Verify drain happened before write_close
        const drainIndex = events.indexOf('drain');
        const writeCloseIndex = events.indexOf('write_close');
        expect(drainIndex).toBeLessThan(writeCloseIndex);

        done();
      }, 100);
    });
  });
});