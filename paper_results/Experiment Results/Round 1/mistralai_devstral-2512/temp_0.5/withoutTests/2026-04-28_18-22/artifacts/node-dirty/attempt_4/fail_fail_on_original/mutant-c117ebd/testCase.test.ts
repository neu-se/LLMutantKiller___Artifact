import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database encoding', () => {
  const testDir = path.join(__dirname, 'test-dirty-encoding');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should fail to read corrupted data when encoding is not UTF-8', (done) => {
    const db = new Dirty(dbPath);
    const testKey = 'test';
    const testValue = { data: 'test' };

    db.on('load', () => {
      db.set(testKey, testValue, (err) => {
        expect(err).toBeNull();

        db.close();

        // Manually corrupt the file by writing non-UTF8 data
        fs.writeFileSync(dbPath, Buffer.from([0xFF, 0xFE, 0xFD]), { flag: 'a' });

        const readDb = new Dirty(dbPath);
        readDb.on('error', (err) => {
          expect(err).toBeDefined();
          readDb.close();
          done();
        });
        readDb.on('load', () => {
          fail('Should not load successfully with corrupted data');
        });
      });
    });
  });
});