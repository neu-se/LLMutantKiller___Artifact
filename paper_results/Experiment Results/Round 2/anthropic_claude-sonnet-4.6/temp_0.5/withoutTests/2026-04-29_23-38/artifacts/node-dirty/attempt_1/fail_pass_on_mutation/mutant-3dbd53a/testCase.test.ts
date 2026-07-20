import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('should correctly persist and reload unicode data', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);
    db.on('load', () => {
      const unicodeValue = { text: 'Hello 世界 🌍 café' };
      db.set('unicode-key', unicodeValue, () => {
        db.close();
        db.once('write_close', () => {
          // Read the file directly to verify encoding
          const fileContent = fs.readFileSync(dbPath, 'utf-8');
          const row = JSON.parse(fileContent.trim());
          
          expect(row.key).toBe('unicode-key');
          expect(row.val.text).toBe('Hello 世界 🌍 café');
          
          // Clean up
          fs.rmSync(tmpDir, { recursive: true });
          done();
        });
      });
    });
  });
});