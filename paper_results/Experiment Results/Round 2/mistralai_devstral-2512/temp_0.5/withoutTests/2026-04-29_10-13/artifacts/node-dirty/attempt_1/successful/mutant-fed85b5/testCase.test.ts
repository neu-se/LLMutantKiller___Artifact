import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty forEach behavior', () => {
  it('should continue iteration when callback returns true', async () => {
    const testDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    // Wait for the database to load
    await new Promise<void>((resolve) => {
      db.on('load', () => resolve());
    });

    // Add some test data
    db.set('key1', 'value1', () => {});
    db.set('key2', 'value2', () => {});
    db.set('key3', 'value3', () => {});

    // Flush writes to disk
    await new Promise<void>((resolve) => {
      db.on('drain', () => resolve());
    });

    const visitedKeys: string[] = [];
    db.forEach((key, val) => {
      visitedKeys.push(key);
      return true;
    });

    // In the original code, returning true should NOT break the loop
    // In the mutated code, returning true WILL break the loop
    expect(visitedKeys).toEqual(['key1', 'key2', 'key3']);

    // Clean up
    db.close();
    await new Promise<void>((resolve) => {
      db.on('write_close', () => {
        fs.promises.rm(testDir, { recursive: true, force: true }).then(resolve);
      });
    });
  });
});