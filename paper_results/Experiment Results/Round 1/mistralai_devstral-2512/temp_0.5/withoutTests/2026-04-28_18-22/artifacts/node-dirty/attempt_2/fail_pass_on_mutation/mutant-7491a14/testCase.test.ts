import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database read stream encoding', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should correctly read UTF-8 encoded data from file', (done) => {
    // Pre-create a database file with UTF-8 content
    const testData = { key: 'test', val: { message: 'café', emoji: '😀' } };
    fs.writeFileSync(dbPath, `${JSON.stringify(testData)}\n`, 'utf-8');

    const db = new Dirty(dbPath);
    db.on('load', (size) => {
      expect(size).toBe(1);
      expect(db.get('test')).toEqual(testData.val);
      db.close();
      done();
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});