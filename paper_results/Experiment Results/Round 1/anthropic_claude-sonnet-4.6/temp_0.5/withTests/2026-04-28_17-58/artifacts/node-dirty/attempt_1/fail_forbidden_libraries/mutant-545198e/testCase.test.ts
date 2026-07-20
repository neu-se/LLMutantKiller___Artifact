import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty load mutation detection', () => {
  it('should correctly load data from a file with multiple records', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-dirty-mutation-${process.pid}.dirty`);
    const content = `{"key":"a","val":1}\n{"key":"b","val":2}\n{"key":"c","val":3}\n`;
    fs.writeFileSync(file, content, 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);
    
    db.on('load', (length) => {
      try {
        expect(length).toBe(3);
        expect(db.get('a')).toBe(1);
        expect(db.get('b')).toBe(2);
        expect(db.get('c')).toBe(3);
        fs.unlinkSync(file);
        done();
      } catch(e) {
        try { fs.unlinkSync(file); } catch(_) {}
        done(e);
      }
    });
    db.on('error', (err) => {
      try { fs.unlinkSync(file); } catch(_) {}
      done(err);
    });
  });
});