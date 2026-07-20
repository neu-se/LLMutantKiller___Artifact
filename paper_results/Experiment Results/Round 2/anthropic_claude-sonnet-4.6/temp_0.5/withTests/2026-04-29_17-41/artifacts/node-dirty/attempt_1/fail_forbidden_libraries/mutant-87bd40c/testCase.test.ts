import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('close destroys read stream', () => {
  it('should emit read_close when close is called while read stream is active', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}.dirty`);
    
    // Create a file with some content to ensure read stream stays open briefly
    fs.writeFileSync(tmpFile, '{"key":"a","val":"b"}\n'.repeat(100));
    
    const db = new Dirty(tmpFile);
    
    // Call close immediately after load to ensure read stream might still be open
    db.on('load', () => {
      db.close();
    });
    
    db.on('read_close', () => {
      fs.unlinkSync(tmpFile);
      done();
    });
    
    // Timeout to fail if read_close never fires
    setTimeout(() => {
      try { fs.unlinkSync(tmpFile); } catch(e) {}
      done(new Error('read_close event never fired'));
    }, 3000);
  });
});