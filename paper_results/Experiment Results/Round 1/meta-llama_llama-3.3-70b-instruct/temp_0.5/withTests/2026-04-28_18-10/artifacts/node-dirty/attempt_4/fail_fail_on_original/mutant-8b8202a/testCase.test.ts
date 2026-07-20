import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', () => {
  it('should not trigger drain event when there are still pending writes', (done) => {
    const file = 'test.dirty';
    fs.unlinkSync(file);
    const db = new Dirty(file);

    let drainTriggered = false;
    db.on('drain', () => {
      drainTriggered = true;
    });

    db.set('key1', 'value1');
    db.set('key2', 'value2', () => {
      expect(drainTriggered).toBe(false);
      db.close();
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        const lines = data.split('\n');
        expect(lines.length).toBe(3); // 2 data lines + 1 empty line at the end
        done();
      });
    });
  });
});