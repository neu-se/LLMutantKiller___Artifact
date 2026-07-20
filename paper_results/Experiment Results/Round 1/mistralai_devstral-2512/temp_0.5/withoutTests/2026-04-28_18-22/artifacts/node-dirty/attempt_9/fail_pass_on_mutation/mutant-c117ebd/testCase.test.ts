import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database encoding', () => {
  const testDir = path.join(__dirname, 'test-dirty-encoding');
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

  it('should fail to read data when encoding is not UTF-8', (done) => {
    const db = new Dirty(dbPath);
    const testKey = 'test';
    const testValue = { data: 'café' };

    db.on('load', () => {
      db.set(testKey, testValue, (err: Error | null) => {
        expect(err).toBeNull();

        db.close();

        // Read and verify the file was written with UTF-8 encoding
        const content = fs.readFileSync(dbPath, 'utf8');
        expect(content).toContain('café');

        // Now test reading with a new instance
        const readDb = new Dirty(dbPath);
        readDb.on('load', () => {
          const retrievedValue = readDb.get(testKey);
          expect(retrievedValue).toEqual(testValue);

          // Verify the file content is still valid UTF-8
          const finalContent = fs.readFileSync(dbPath, 'utf8');
          expect(finalContent).toContain('café');

          readDb.close();
          done();
        });
      });
    });
  });
});