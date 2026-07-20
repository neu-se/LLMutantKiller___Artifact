import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

describe('dirty', () => {
  it('should load records correctly when stream emits chunks without newlines', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}.dirty`);

    const row1 = JSON.stringify({ key: 'k1', val: 'v1' });
    const row2 = JSON.stringify({ key: 'k2', val: 'v2' });
    fs.writeFileSync(file, `${row1}\n${row2}\n`, 'utf-8');

    const fsModule = require('fs');
    const origFn = fsModule.createReadStream;
    let intercepted = false;

    // Override on the require'd module object directly
    Object.defineProperty(fsModule, 'createReadStream', {
      configurable: true,
      writable: true,
      value: function(p: string, opts: any) {
        if (p === file && !intercepted) {
          intercepted = true;
          // Restore immediately so writeStream creation works normally
          Object.defineProperty(fsModule, 'createReadStream', {
            configurable: true, writable: true, value: origFn
          });
          const { EventEmitter } = require('events');
          const emitter = new EventEmitter();
          (emitter as any).destroy = () => {};
          const content = `${row1}\n${row2}\n`;
          process.nextTick(() => {
            // Deliver byte by byte - most chunks have no '\n'
            for (let i = 0; i < content.length; i++) {
              emitter.emit('data', content[i]);
            }
            emitter.emit('end');
            emitter.emit('close');
          });
          return emitter;
        }
        return origFn.call(fsModule, p, opts);
      }
    });

    const dirtyCachePath = require.resolve('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    delete require.cache[dirtyCachePath];
    const Dirty = require(dirtyCachePath);

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