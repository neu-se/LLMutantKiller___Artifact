import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database file loading', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should process complete lines and ignore incomplete lines without newline', (done) => {
    // Create a test database file with one complete line and one incomplete line
    const testData = '{"key":"testKey1","val":"testValue1"}\n{"key":"testKey2","val":"testValue2"}';
    fs.writeFileSync(dbPath, testData);

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      // The original code should process only the complete line (with newline)
      // and ignore the incomplete line (without newline)
      expect(size).toBe(1);
      expect(db.get('testKey1')).toEqual('testValue1');
      expect(db.get('testKey2')).toBeUndefined();
      done();
    });

    db.on('error', (err) => {
      done(err);
    });
  }, 5000);
});