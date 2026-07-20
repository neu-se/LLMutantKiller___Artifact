import { tmpdir } from 'os';
import { join } from 'path';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import * as fsModule from 'fs';
import { Readable } from 'stream';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should load records correctly when chunks arrive without newlines', (done) => {
    const dbPath = join(tmpdir(), `dirty-test-${process.pid}.db`);
    writeFileSync(dbPath, JSON.stringify({key: 'test', val: 123}) + '\n');
    
    // Mock createReadStream to deliver data in specific chunks
    const originalCreateReadStream = fsModule.createReadStream;
    let callCount = 0;
    
    jest.spyOn(fsModule, 'createReadStream').mockImplementation((path, options: any) => {
      callCount++;
      if (callCount === 1) {
        // First call is for reading - deliver chunks without newline then with newline
        const readable = new Readable({ read() {} });
        process.nextTick(() => {
          // Deliver the record in two chunks: first without newline, then with
          const record = JSON.stringify({key: 'test', val: 123});
          readable.push(record); // no newline - this is the key chunk
          readable.push('\n');   // newline in separate chunk
          readable.push(null);
        });
        return readable as any;
      }
      return originalCreateReadStream(path as string, options);
    });
    
    const db = new Dirty(dbPath);
    
    db.on('load', (count) => {
      jest.restoreAllMocks();
      try {
        expect(count).toBe(1);
        expect(db.get('test')).toBe(123);
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done();
      } catch(e) {
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done(e);
      }
    });
    
    db.on('error', (err) => {
      jest.restoreAllMocks();
      if (existsSync(dbPath)) unlinkSync(dbPath);
      done(err);
    });
  });
});