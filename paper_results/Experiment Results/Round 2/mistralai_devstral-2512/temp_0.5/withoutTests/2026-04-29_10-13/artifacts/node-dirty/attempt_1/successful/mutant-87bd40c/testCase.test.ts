import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty close method', () => {
  it('should destroy read stream when close is called', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Create test directory
    fs.mkdirSync(testDir, { recursive: true });

    // Create a test database file
    fs.writeFileSync(dbPath, '{"key":"testKey","val":"testValue"}\n');

    const db = new Dirty(dbPath);

    // Wait for the database to load
    db.on('load', () => {
      // Verify read stream exists
      expect(db._readStream).not.toBeNull();

      // Spy on destroy method to verify it's called
      const originalDestroy = db._readStream.destroy;
      let destroyCalled = false;
      db._readStream.destroy = function() {
        destroyCalled = true;
        return originalDestroy.apply(this, arguments);
      };

      // Close the database
      db.close();

      // Verify destroy was called
      expect(destroyCalled).toBe(true);

      // Clean up
      rimraf.sync(testDir);
      done();
    });

    db.on('error', (err) => {
      rimraf.sync(testDir);
      done(err);
    });
  });
});