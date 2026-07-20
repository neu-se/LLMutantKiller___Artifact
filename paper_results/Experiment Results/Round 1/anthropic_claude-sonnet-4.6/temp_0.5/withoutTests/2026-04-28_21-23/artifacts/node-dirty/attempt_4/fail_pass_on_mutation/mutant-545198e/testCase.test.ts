import { tmpdir } from 'os';
import { join } from 'path';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database loading', () => {
  it('should correctly count loaded records', (done) => {
    const dbPath = join(tmpdir(), `dirty-mut-${process.pid}.db`);
    
    // Large file to force multiple chunks, ensuring a chunk without newline occurs
    const lines: string[] = [];
    for (let i = 0; i < 1000; i++) {
      lines.push(JSON.stringify({key: `k${i}`, val: i}));
    }
    writeFileSync(dbPath, lines.join('\n') + '\n');
    
    const db = new Dirty(dbPath);
    
    db.on('load', (count) => {
      try {
        expect(count).toBe(1000);
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done();
      } catch(e) {
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done(e);
      }
    });
    
    db.on('error', (err) => {
      if (existsSync(dbPath)) unlinkSync(dbPath);
      done(err);
    });
  });
});