import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

describe('dirty', () => {
  it('should load records correctly when file chunks lack trailing newlines', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}.dirty`);

    const row1 = JSON.stringify({ key: 'k1', val: 'v1' });
    const row2 = JSON.stringify({ key: 'k2', val: 'v2' });
    fs.writeFileSync(file, `${row1}\n${row2}\n`, 'utf-8');

    const spy = jest.spyOn(fs, 'createReadStream').mockImplementationOnce(
      (filePath: any, options: any) => {
        const emitter = new EventEmitter() as any;
        emitter.destroy = () => {};

        process.nextTick(() => {
          // Deliver content byte-by-byte so most chunks have no newline
          const content = `${row1}\n${row2}\n`;
          for (let i = 0; i < content.length; i++) {
            emitter.emit('data', content[i]);
          }
          emitter.emit('end');
          emitter.emit('close');
        });

        return emitter;
      }
    );

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const db = new Dirty(file);

    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));

    db.on('load', (length: number) => {
      spy.mockRestore();
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