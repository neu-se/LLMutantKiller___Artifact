import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event', () => {
  it('should emit drain event when write stream drains and no writes are in flight', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Ensure clean state
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);

    // Wait for initial load
    db.on('load', () => {
      // Write data that will fill the buffer and trigger drain
      const largeData = { key: 'test', val: { data: 'x'.repeat(10000) } };
      db.set('test', largeData, (err) => {
        if (err) done(err);

        // Force drain by ending the write stream
        db._writeStream.end(() => {
          // The drain event should be emitted when _inFlightWrites reaches 0
          db.on('drain', () => {
            // Verify the mutation would prevent this event
            done();
          });

          // Simulate the drain condition
          db._inFlightWrites = 0;
          db._waitForDrain = false;
          db._writeStream.emit('drain');
        });
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});