import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db loading', () => {
  it('should correctly load data from a file with multiple records', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-mutant-${Date.now()}.dirty`);
    
    // Write a file with known content
    const content = `{"key":"foo","val":"bar"}\n{"key":"baz","val":"qux"}\n`;
    fs.writeFileSync(file, content, 'utf-8');
    
    const db = new Dirty(file);
    db.on('load', (length) => {
      try {
        expect(length).toBe(2);
        expect(db.get('foo')).toBe('bar');
        expect(db.get('baz')).toBe('qux');
        fs.unlinkSync(file);
        done();
      } catch (e) {
        fs.unlinkSync(file);
        done(e);
      }
    });
    db.on('error', (err) => {
      fs.unlinkSync(file);
      done(err);
    });
  });
});