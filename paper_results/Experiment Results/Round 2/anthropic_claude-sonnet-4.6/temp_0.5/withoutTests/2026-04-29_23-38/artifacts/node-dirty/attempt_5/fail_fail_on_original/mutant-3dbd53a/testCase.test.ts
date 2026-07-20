import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('write stream should have encoding set to utf-8', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new (Dirty as any)(dbPath);
    
    db.on('load', () => {
      // Check the encoding property of the write stream
      const writeStream = (db as any)._writeStream;
      
      // The writableEncoding should reflect the encoding set via setDefaultEncoding
      expect(writeStream.writableEncoding).toBe('utf-8');
      
      db.close();
      db.once('write_close', () => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });
    });
    
    db.on('error', (err: Error) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  });
});