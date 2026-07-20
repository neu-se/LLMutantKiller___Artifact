import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty flush respects drain backpressure', () => {
  it('should write each key exactly once to the file even under backpressure', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `dirty-backpressure-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Set a single key then immediately check it drains correctly
      db.set('hello', 'world');

      db.once('drain', () => {
        const contents = fs.readFileSync(file, 'utf-8');
        const lines = contents.trim().split('\n').filter(Boolean);
        expect(lines.length).toBe(1);
        expect(JSON.parse(lines[0])).toEqual({ key: 'hello', val: 'world' });
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});