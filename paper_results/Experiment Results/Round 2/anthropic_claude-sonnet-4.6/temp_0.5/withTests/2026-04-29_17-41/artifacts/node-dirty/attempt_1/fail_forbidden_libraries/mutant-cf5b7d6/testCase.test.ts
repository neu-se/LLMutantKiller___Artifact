import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty data loading', () => {
  it('should correctly load all records from a file with multiple rows', (done) => {
    const tmpFile = path.join(os.tmpdir(), `test-dirty-${Date.now()}.dirty`);
    fs.writeFileSync(tmpFile, '{"key":"a","val":"1"}\n{"key":"b","val":"2"}\n{"key":"c","val":"3"}\n');
    
    const db = new Dirty(tmpFile);
    db.on('load', (size) => {
      expect(size).toBe(3);
      expect(db.get('a')).toBe('1');
      expect(db.get('b')).toBe('2');
      expect(db.get('c')).toBe('3');
      fs.unlinkSync(tmpFile);
      done();
    });
  });
});