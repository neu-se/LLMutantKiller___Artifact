import { tmpdir } from 'os';
import { join } from 'path';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import { Readable } from 'stream';

describe('Dirty database', () => {
  it('should load records correctly when chunk has no newline', (done) => {
    const dbPath = join(tmpdir(), `dirty-test-${process.pid}.db`);
    writeFileSync(dbPath, '');
    
    // Get the fs module as used by dirty.js
    const fs = require('fs');
    const originalCreateReadStream = fs.createReadStream;
    
    let callCount = 0;
    fs.createReadStream = function(path: string, options: any) {
      callCount++;
      if (callCount === 1) {
        const readable = new Readable({ read() {} });
        process.nextTick(() => {
          readable.push('{"key":"test","val":42}'); // no newline
          readable.push('\n');
          readable.push(null);
        });
        return readable;
      }
      return originalCreateReadStream.call(fs, path, options);
    };
    
    const { Dirty } = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);
    
    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));
    
    db.on('load', (count: number) => {
      fs.createReadStream = originalCreateReadStream;
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('test')).toBe(42);
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done();
      } catch(e) {
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done(e as Error);
      }
    });
  });
});