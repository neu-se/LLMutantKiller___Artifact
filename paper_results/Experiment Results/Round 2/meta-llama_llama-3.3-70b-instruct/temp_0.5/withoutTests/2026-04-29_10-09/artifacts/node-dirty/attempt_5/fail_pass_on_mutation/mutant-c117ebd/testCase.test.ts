import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should write data in utf-8 encoding', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.set('key', '\ud83d\udc68', () => {
      dirty.close();
      // Read the written data
      const data = fs.readFileSync(dbPath, 'utf-8');
      expect(data.charCodeAt(0)).toBe(123); // ASCII code for '{'
      fs.unlinkSync(dbPath);
      done();
    });
  });
});