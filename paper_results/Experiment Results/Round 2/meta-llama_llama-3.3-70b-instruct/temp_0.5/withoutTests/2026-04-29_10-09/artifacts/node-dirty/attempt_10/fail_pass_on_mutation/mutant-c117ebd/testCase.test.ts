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
      const data = buffer.toString('utf8');
      expect(data).toContain('é'); // Check if the data contains the expected character
      expect(() => {
        JSON.parse(data);
      }).not.toThrow(); // Check if the data is valid JSON
      fs.unlinkSync(dbPath);
      done();
    });
  });
});