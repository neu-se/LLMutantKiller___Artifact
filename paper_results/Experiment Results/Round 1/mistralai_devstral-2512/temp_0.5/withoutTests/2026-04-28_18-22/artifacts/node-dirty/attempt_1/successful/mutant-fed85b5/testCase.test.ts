import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty forEach behavior', () => {
  const testDir = path.join(__dirname, 'test-dirty');
  const testFile = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('should continue iteration when callback returns true', (done) => {
    const db = new Dirty(testFile);
    const keys = ['a', 'b', 'c', 'd', 'e'];
    const values = [1, 2, 3, 4, 5];

    // Set up initial data
    keys.forEach((key, i) => {
      db.set(key, values[i], (err) => {
        if (err) done(err);
      });
    });

    // Wait for data to be written
    db.once('drain', () => {
      const visitedKeys: string[] = [];

      // This callback returns true, which should NOT break the loop in original code
      // but WILL break the loop in mutated code
      db.forEach((key, val) => {
        visitedKeys.push(key);
        return true;
      });

      // In original code, all keys should be visited
      // In mutated code, only first key will be visited
      expect(visitedKeys).toEqual(keys);
      done();
    });
  });
});