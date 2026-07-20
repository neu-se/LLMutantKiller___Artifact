import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database encoding behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should correctly handle multi-byte UTF-8 characters in database file', (done) => {
    // Create a database file with multi-byte UTF-8 characters
    const testData = { key: 'test', val: { text: 'café', emoji: '😀' } };
    const fileContent = `${JSON.stringify(testData)}\n`;
    fs.writeFileSync(dbPath, fileContent, 'utf-8');

    const db = new Dirty(dbPath);
    db.on('load', (size) => {
      expect(size).toBe(1);
      const value = db.get('test');
      expect(value).toEqual(testData.val);
      expect(value.text).toBe('café');
      expect(value.emoji).toBe('😀');
      db.close();
      done();
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});