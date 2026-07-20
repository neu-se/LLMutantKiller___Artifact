import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should pass utf-8 encoding option to createReadStream', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-spy2-${process.pid}.db`);
    fs.writeFileSync(dbPath, JSON.stringify({key:'k',val:'v'}) + '\n', 'utf-8');

    const spy = jest.spyOn(fs, 'createReadStream');
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      try {
        const calls = spy.mock.calls;
        const readStreamCall = calls.find(c => c[0] === dbPath);
        expect(readStreamCall).toBeDefined();
        const opts = readStreamCall![1] as any;
        expect(opts.encoding).toBe('utf-8');
        done();
      } catch(err) {
        done(err);
      } finally {
        spy.mockRestore();
        try { fs.unlinkSync(dbPath); } catch(e) {}
      }
    });
    
    db.on('error', (err: Error) => {
      spy.mockRestore();
      try { fs.unlinkSync(dbPath); } catch(e) {}
      done(err);
    });
  });
});