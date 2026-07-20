import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { EventEmitter } from 'events';

describe('dirty', () => {
  it('should correctly process file data when chunks span row boundaries', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-span-${Date.now()}.dirty`);

    const row1 = JSON.stringify({ key: 'k1', val: 'v1' });
    const row2 = JSON.stringify({ key: 'k2', val: 'v2' });
    const content = `${row1}\n${row2}\n`;
    fs.writeFileSync(file, content, 'utf-8');

    // Get the fs module as dirty will see it, and patch createReadStream on it
    const fsModule = require('fs');
    const origCreateReadStream = fsModule.createReadStream;

    let patched = false;
    fsModule.createReadStream = function (p: string, opts: any) {
      if (p === file && !patched) {
        patched = true;
        fsModule.createReadStream = origCreateReadStream;

        const emitter = new EventEmitter() as any;
        emitter.destroy = () => {};

        setImmediate(() => {
          // Deliver: first chunk ends mid-row1 (no newline)
          // second chunk completes row1 + newline + row2 + newline
          const splitPoint = Math.floor(row1.length / 2);
          emitter.emit('data', content.slice(0, splitPoint));
          emitter.emit('data', content.slice(splitPoint));
          emitter.emit('end');
          emitter.emit('close');
        });

        return emitter;
      }
      return origCreateReadStream.call(this, p, opts);
    };

    // Clear dirty from cache so it picks up the patched fs
    const dirtyPath = require.resolve('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    delete require.cache[dirtyPath];
    const Dirty = require(dirtyPath);

    const db = new Dirty(file);

    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));

    db.on('load', (length: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(length).toBe(2);
        expect(db.get('k1')).toBe('v1');
        expect(db.get('k2')).toBe('v2');
        try { fs.unlinkSync(file); } catch (_) {}
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(err);
      }
    });
  });
});