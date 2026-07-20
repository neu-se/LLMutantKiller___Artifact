import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should write data in utf-8 encoding', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.set('key', '\ud83d\udc68', () => {
      dirty.close();
      // Read the written data
      const buffer = fs.readFileSync(dbPath);
      expect(buffer.toString('utf8')).toContain('\ud83d\udc68');
      fs.unlinkSync(dbPath);
      done();
    });
  });
});