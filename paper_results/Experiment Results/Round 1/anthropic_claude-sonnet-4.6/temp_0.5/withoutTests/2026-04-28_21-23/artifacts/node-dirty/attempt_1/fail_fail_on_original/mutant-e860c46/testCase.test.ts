import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with in-flight writes', () => {
  it('should wait for in-flight writes to complete before closing', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Set multiple values to create in-flight writes
      let writeCompleted = false;

      db.set('key1', { value: 'data1' }, () => {
        writeCompleted = true;
      });

      db.set('key2', { value: 'data2' });
      db.set('key3', { value: 'data3' });

      // Call close() - with in-flight writes, original code waits for drain
      // The mutated code ignores _inFlightWrites > 0 and may close prematurely
      db.close();

      // After close, listen for write_close to verify proper shutdown
      db.once('write_close', () => {
        // Verify the data was actually written to disk
        try {
          const fileContent = fs.readFileSync(dbPath, 'utf-8');
          const lines = fileContent.trim().split('\n').filter(l => l.length > 0);
          
          // All 3 keys should have been written
          const rows = lines.map(l => JSON.parse(l));
          const keys = rows.map(r => r.key);
          
          expect(keys).toContain('key1');
          expect(keys).toContain('key2');
          expect(keys).toContain('key3');
          
          rimraf(tmpDir).then(() => done()).catch(done);
        } catch (err) {
          rimraf(tmpDir).then(() => done(err)).catch(done);
        }
      });
    });

    db.on('error', (err) => {
      rimraf(tmpDir).then(() => done(err)).catch(done);
    });
  });
});