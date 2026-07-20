import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should write data in utf-8 encoding', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.set('key', 'é', () => {
      dirty.close();
      // Read the written data
      const data = fs.readFileSync(dbPath, 'utf-8');
      expect(() => {
        JSON.parse(data);
      }).not.toThrow();
      fs.unlinkSync(dbPath);
      done();
    });
  });
});