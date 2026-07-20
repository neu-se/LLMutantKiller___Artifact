import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database chunk processing', () => {
  it('should correctly handle chunks with newlines in the middle', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    // Create a test database file with multiple lines
    const testData = '{"key":"testKey1","val":"testValue1"}\n{"key":"testKey2","val":"testValue2"}';
    fs.writeFileSync(dbPath, testData);

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
        expect(size).toBe(2);
        expect(db.get('testKey1')).toBe('testValue1');
        expect(db.get('testKey2')).toBe('testValue2');
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