import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database parsing behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should not be affected by return value changes in row parsing', (done) => {
    // Create a database file with multiple entries
    fs.writeFileSync(dbPath, '{"key":"a","val":1}\n{"key":"b","val":2}\n{"key":"c","val":3}\n');

    const db = new Dirty(dbPath);
    let events = [];

    db.on('load', (size) => {
      events.push('load');
      // Verify all entries were loaded correctly
      expect(size).toBe(3);
      expect(db.get('a')).toBe(1);
      expect(db.get('b')).toBe(2);
      expect(db.get('c')).toBe(3);
      // Ensure no error events were fired
      expect(events.filter(e => e.startsWith('error')).length).toBe(0);
      done();
    });

    db.on('error', (err) => {
      events.push(`error:${err.message}`);
      // If mutation causes issues, this will catch it
      done(new Error(`Unexpected error: ${err.message}`));
    });

    // Timeout to ensure test fails if load doesn't fire
    setTimeout(() => {
      if (events.length === 0) {
        done(new Error('No events fired'));
      }
    }, 200);
  });
});