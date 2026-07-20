import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close with read stream', () => {
  it('should emit read_close when close() is called while read stream is active', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}.db`);
    // Write some data to make the read stream take time
    fs.writeFileSync(tmpFile, '{"key":"a","val":1}\n'.repeat(1000));
    
    const db = new Dirty(tmpFile);
    
    db.once('read_close', () => {
      fs.unlinkSync(tmpFile);
      done();
    });
    
    // Call close immediately before the read stream finishes
    db.close();
  });
});