import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database encoding behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    // Clean up and create test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    // Clean up
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should correctly handle UTF-8 encoded data with BOM', (done) => {
    // Create a file with UTF-8 BOM
    const testData = { key: 'test', val: { message: 'café' } };
    const fileContent = '\uFEFF' + JSON.stringify(testData) + '\n';
    fs.writeFileSync(dbPath, fileContent, 'utf-8');

    const db = new Dirty(dbPath);
    db.on('load', (size) => {
      expect(size).toBe(1);
      const value = db.get('test');
      expect(value).toEqual(testData.val);
      db.close();
      done();
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});