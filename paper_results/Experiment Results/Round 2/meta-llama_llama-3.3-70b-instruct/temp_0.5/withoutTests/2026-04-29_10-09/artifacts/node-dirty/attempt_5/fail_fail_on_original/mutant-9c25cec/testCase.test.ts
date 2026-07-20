import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should load a valid row', (done) => {
    const dbPath = 'test.db';
    fs.writeFileSync(dbPath, '{"key": "value"}\n');
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      expect(dirty.get('key')).toBe('value');
      fs.unlinkSync(dbPath);
      done();
    });
  });
});