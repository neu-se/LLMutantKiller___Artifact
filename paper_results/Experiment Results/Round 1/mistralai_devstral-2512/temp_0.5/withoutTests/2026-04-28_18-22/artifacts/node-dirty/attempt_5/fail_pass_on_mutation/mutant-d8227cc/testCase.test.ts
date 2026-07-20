import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database chunk processing', () => {
  it('should correctly process chunks with newlines', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    // Create a test database file with a single line ending with newline
    const testData = '{"key":"testKey","val":"testValue"}\n';
    fs.writeFileSync(dbPath, testData);

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
        expect(size).toBe(1);
        expect(db.get('testKey')).toBe('testValue');
        db.close();
        done();
      } catch (error) {
        done(error);
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});