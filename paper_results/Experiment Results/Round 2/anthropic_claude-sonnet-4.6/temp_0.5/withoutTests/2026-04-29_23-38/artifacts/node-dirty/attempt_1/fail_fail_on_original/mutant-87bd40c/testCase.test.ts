// Jest test file containing exactly one test case
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() read stream destruction', () => {
  it('should emit read_close event when close() is called while read stream is active', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    // Write some data to the file so the read stream has something to read
    fs.writeFileSync(dbPath, '{"key":"foo","val":"bar"}\n');
    
    const db = new Dirty(dbPath);
    
    // Call close() immediately before the stream finishes
    // The read stream should still be open
    db.close();
    
    db.once('read_close', () => {
      rimraf(tmpDir).then(() => done());
    });
    
    // Timeout fallback
    setTimeout(() => {
      rimraf(tmpDir).then(() => done(new Error('read_close event was never emitted')));
    }, 2000);
  });
});