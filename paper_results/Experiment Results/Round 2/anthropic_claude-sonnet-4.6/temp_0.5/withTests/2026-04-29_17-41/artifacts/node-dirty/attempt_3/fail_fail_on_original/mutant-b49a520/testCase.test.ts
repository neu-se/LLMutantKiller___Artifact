import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

describe('dirty db chunk without newline behavior', () => {
  it('should emit load with 0 records (not error) when a data chunk without newline is received', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-test-${process.pid}.dirty`);
    fs.writeFileSync(file, '', 'utf-8');

    const spy = jest.spyOn(fs, 'createReadStream').mockImplementationOnce((filePath: any, opts: any) => {
      const emitter = new EventEmitter() as any;
      emitter.destroy = () => {};
      process.nextTick(() => {
        // Emit a chunk with no newline - original drops it (early return before buffer +=)
        // mutated adds it to buffer, causing error on 'end'
        emitter.emit('data', '{"key":"foo","val":"bar"}');
        emitter.emit('end');
        emitter.emit('close');
      });
      return emitter;
    });

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    db.on('load', (length: number) => {
      spy.mockRestore();
      try { fs.unlinkSync(file); } catch (_) {}
      // Original: chunk was dropped (early return), buffer empty, load fires with 0
      expect(length).toBe(0);
      done();
    });

    db.on('error', (err: Error) => {
      spy.mockRestore();
      try { fs.unlinkSync(file); } catch (_) {}
      // Mutated: chunk added to buffer, end sees non-empty buffer, error fires
      done(new Error(`Expected load event but got error: ${err.message}`));
    });
  });
});