import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('error emission when write fails with no callback', () => {
  it('should emit error event when write fails and no callback is provided for the key', (done) => {
    // Use a path in a non-existent directory to cause write failure
    const badPath = path.join(os.tmpdir(), 'nonexistent_dir_xyz_12345', 'test.dirty');
    
    const db = new (Dirty as any)(badPath);
    
    db.on('error', (err: Error) => {
      // Original code: emits error when cbs.length === 0 and err != null
      // Mutated code: does NOT emit error when cbs.length === 0
      expect(err).toBeTruthy();
      done();
    });
    
    // Set without a callback so cbs.length === 0
    db.set('key', 'value'); // no callback
    
    // Timeout to fail if error never emitted
    setTimeout(() => {
      done(new Error('Expected error event was not emitted'));
    }, 3000);
  });
});