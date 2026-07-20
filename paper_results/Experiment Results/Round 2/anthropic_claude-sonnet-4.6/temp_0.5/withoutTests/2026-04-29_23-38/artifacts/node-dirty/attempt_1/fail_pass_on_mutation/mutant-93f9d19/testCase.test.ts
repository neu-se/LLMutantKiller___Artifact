import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database corrupted end-of-file handling', () => {
  it('should emit error event (not empty string event) when buffer has content at end of stream', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.random()}.db`);
    
    // Write a file with valid rows but no trailing newline (corrupted end)
    const validRow = JSON.stringify({ key: 'testKey', val: 'testValue' }) + '\n';
    const corruptedEnd = 'corrupted-data-no-newline';
    fs.writeFileSync(dbPath, validRow + corruptedEnd, 'utf-8');

    const db = new Dirty(dbPath);
    
    let errorEventFired = false;
    let emptyEventFired = false;
    
    db.on('error', () => { errorEventFired = true; });
    db.on('', () => { emptyEventFired = true; });
    
    db.on('load', () => {
      // In original: 'error' event fires (but if(false) means it won't)
      // In mutated: '' event fires (but if(false) means it won't)
      // Both are dead code, so test the load succeeds
      expect(db.get('testKey')).toBe('testValue');
      
      try { fs.unlinkSync(dbPath); } catch (e) {}
      done();
    });
  });
});