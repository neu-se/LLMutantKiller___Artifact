import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should write data in utf-8 encoding', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.set('key', 'é', () => {
      dirty.close();
      // Read the written data
      const buffer = fs.readFileSync(dbPath);
      const data = buffer.toString('latin1');
      expect(data).toContain('é');
      fs.unlinkSync(dbPath);
      done();
    });
  });
});