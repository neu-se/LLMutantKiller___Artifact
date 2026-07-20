import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with pending writes', () => {
  it('should wait for pending writes to complete before closing', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Set multiple values to create pending writes
      db.set('key1', { value: 'data1' });
      db.set('key2', { value: 'data2' });
      db.set('key3', { value: 'data3' });

      // Close immediately while writes may still be in flight
      db.close();

      // Listen for write_close to know when the write stream is actually closed
      db.on('write_close', () => {
        // After close completes, verify data was persisted by reading the file
        const fileContent = fs.readFileSync(dbPath, 'utf-8');
        const lines = fileContent.trim().split('\n').filter(l => l.length > 0);
        
        // All 3 keys should have been written
        expect(lines.length).toBe(3);
        
        const parsedRows = lines.map(line => JSON.parse(line));
        const keys = parsedRows.map(row => row.key);
        
        expect(keys).toContain('key1');
        expect(keys).toContain('key2');
        expect(keys).toContain('key3');
        
        // Cleanup
        fs.rmSync(tmpDir, { recursive: true });
        done();
      });
    });
  });
});