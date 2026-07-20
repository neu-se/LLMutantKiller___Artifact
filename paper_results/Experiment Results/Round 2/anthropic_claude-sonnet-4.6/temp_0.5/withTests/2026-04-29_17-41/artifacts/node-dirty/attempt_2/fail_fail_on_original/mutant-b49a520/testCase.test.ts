import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty db chunk accumulation', () => {
  it('should correctly load a record that spans multiple read chunks without newlines', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-test-${Date.now()}.dirty`);

    // Write a valid db file
    const record = JSON.stringify({ key: 'testkey', val: 'testval' }) + '\n';
    fs.writeFileSync(file, record, 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    // Override fs.createReadStream to emit chunks without newlines except the last
    const originalCreateReadStream = fs.createReadStream;
    (fs as any).createReadStream = (filePath: string, opts: any) => {
      if (filePath !== file) return originalCreateReadStream(filePath, opts);
      const { EventEmitter } = require('events');
      const emitter = new EventEmitter();
      emitter.destroy = () => {};
      process.nextTick(() => {
        // Split the record into two chunks, neither containing '\n' except the second
        const part1 = record.slice(0, record.length - 2); // no newline
        const part2 = record.slice(record.length - 2);    // contains '\n'
        emitter.emit('data', part1);
        emitter.emit('data', part2);
        emitter.emit('end');
        emitter.emit('close');
      });
      return emitter;
    };

    const db = new Dirty(file);

    db.on('load', (length: number) => {
      (fs as any).createReadStream = originalCreateReadStream;
      try {
        expect(length).toBe(1);
        expect(db.get('testkey')).toBe('testval');
        fs.unlinkSync(file);
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(err);
      }
    });

    db.on('error', (err: Error) => {
      (fs as any).createReadStream = originalCreateReadStream;
      try { fs.unlinkSync(file); } catch (_) {}
      done(err);
    });
  });
});