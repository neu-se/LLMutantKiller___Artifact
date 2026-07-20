import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', () => {
  it('should not trigger drain event before all pending writes are completed', (done) => {
    const file = 'test.dirty';
    fs.unlinkSync(file);
    const db = new Dirty(file);

    let drainTriggered = false;
    db.on('drain', () => {
      drainTriggered = true;
    });

    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3', () => {
      expect(drainTriggered).toBe(true);
      db.close();
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        const lines = data.split('\n');
        expect(lines.length).toBe(4); // 3 data lines + 1 empty line at the end
        const lastLine = lines[lines.length - 2];
        expect(lastLine).toContain('key3');
        done();
      });
    });
  });
});