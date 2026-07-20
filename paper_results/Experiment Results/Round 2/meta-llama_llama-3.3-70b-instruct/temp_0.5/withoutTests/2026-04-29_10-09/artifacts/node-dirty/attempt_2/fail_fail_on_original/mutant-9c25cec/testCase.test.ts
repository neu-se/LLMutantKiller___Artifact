import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should not emit an error when loading a valid row', (done) => {
    const dbPath = 'test.db';
    fs.writeFileSync(dbPath, '{"key": "value"}\n{"key2": "value2"}');
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      expect(dirty.size()).toBe(2);
      fs.unlinkSync(dbPath);
      done();
    });
    dirty.on('error', (err) => {
      expect(err).toBeUndefined();
      fs.unlinkSync(dbPath);
      done();
    });
  });
});