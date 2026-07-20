import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { PassThrough } from 'stream';

describe('dirty', () => {
  it('should load records correctly from a file', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-passthrough-${Date.now()}.dirty`);

    const row1 = JSON.stringify({ key: 'k1', val: 'v1' });
    const row2 = JSON.stringify({ key: 'k2', val: 'v2' });
    fs.writeFileSync(file, `${row1}\n${row2}\n`, 'utf-8');

    // Use a PassThrough to intercept and re-emit with controlled chunks
    const originalCreateReadStream = fs.createReadStream.bind(fs);
    const fsModule = require('fs');
    const origFn = fsModule.createReadStream;
    fsModule.createReadStream = function(p: string, opts: any) {
      const real = origFn(p, opts);
      if (p !== file) return real;
      const pass = new PassThrough({ encoding: 'utf8' });
      // Inject an empty-string data event before real data
      const orig_on = real.on.bind(real);
      real.pipe(pass);
      const wrapper = new PassThrough({ encoding: 'utf8' });
      wrapper.destroy = () => { real.destroy(); pass.destroy(); };
      let firstChunk = true;
      pass.on('data', (chunk: string) => {
        if (firstChunk) {
          firstChunk = false;
          // emit empty chunk first - this is where original vs mutated differ
          wrapper.emit('data', '');
        }
        wrapper.emit('data', chunk);
      });
      pass.on('end', () => wrapper.emit('end'));
      pass.on('close', () => wrapper.emit('close'));
      pass.on('error', (e: Error) => wrapper.emit('error', e));
      return wrapper;
    };

    const dirtyCachePath = require.resolve('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    delete require.cache[dirtyCachePath];
    const Dirty = require(dirtyCachePath);
    fsModule.createReadStream = origFn;

    const db = new Dirty(file);

    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));

    db.on('load', (length: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(length).toBe(2);
        expect(db.get('k1')).toBe('v1');
        expect(db.get('k2')).toBe('v2');
        fs.unlinkSync(file);
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(err);
      }
    });
  });
});