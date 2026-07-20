import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database flush behavior with multiple writes', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should write all queued entries when flush is called multiple times', (done) => {
    const db = new Dirty(dbPath);
    let loadCount = 0;

    db.on('load', () => {
      // Queue multiple writes
      db.set('key1', { value: 1 });
      db.set('key2', { value: 2 });
      db.set('key3', { value: 3 });

      // Force flush by checking internal state
      setImmediate(() => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const lines = data.trim().split('\n');
        expect(lines.length).toBe(3);

        const keysFound = lines.map(line => JSON.parse(line).key);
        expect(keysFound).toContain('key1');
        expect(keysFound).toContain('key2');
        expect(keysFound).toContain('key3');

        db.close();
        done();
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});