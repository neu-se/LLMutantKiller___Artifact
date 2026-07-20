import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with pending writes', () => {
  it('should wait for pending writes before closing when queue is not empty', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Set multiple values to create pending writes
      let writeCount = 0;
      const totalWrites = 5;

      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, { value: `data${i}` }, () => {
          writeCount++;
        });
      }

      // Close immediately after setting values (before writes complete)
      db.close();

      // After close, listen for write_close to verify all writes completed
      db.on('write_close', () => {
        // Verify the file was written with all the data
        const fileContent = fs.readFileSync(dbPath, 'utf-8');
        const lines = fileContent.trim().split('\n').filter(l => l.length > 0);
        
        // All 5 writes should have been persisted before close
        expect(lines.length).toBe(totalWrites);
        
        // Verify all callbacks were called
        expect(writeCount).toBe(totalWrites);

        rimraf(tmpDir).then(() => done()).catch(done);
      });
    });

    db.on('error', done);
  });
});