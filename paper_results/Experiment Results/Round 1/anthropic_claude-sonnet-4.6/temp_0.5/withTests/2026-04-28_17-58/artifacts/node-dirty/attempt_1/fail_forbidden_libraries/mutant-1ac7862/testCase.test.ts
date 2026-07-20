import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('flush writes all queued keys', () => {
  it('should call callbacks for all keys set before drain fires', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}-${Math.random().toString(36).slice(2)}.dirty`);
    
    const db = new Dirty(tmpFile);
    db.on('load', () => {
      let cb1Called = false;
      let cb2Called = false;
      let cb3Called = false;

      db.set('key1', 'val1', () => { cb1Called = true; });
      db.set('key2', 'val2', () => { cb2Called = true; });
      db.set('key3', 'val3', () => {
        cb3Called = true;
        expect(cb1Called).toBe(true);
        expect(cb2Called).toBe(true);
        expect(cb3Called).toBe(true);
        fs.unlinkSync(tmpFile);
        done();
      });
    });
  });
});