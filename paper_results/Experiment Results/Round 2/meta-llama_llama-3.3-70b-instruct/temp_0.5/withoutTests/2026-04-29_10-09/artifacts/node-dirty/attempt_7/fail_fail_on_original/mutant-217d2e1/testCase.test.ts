import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should handle parsing error correctly', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    let dataLoaded = false;

    dirty.on('load', () => {
      dataLoaded = true;
    });

    dirty.on('error', (err) => {
      if (dataLoaded) {
        expect(true).toBe(false);
      }
      fs.unlinkSync(dbPath);
      done();
    });

    fs.writeFileSync(dbPath, '{"key":"test", "val": {"key":"test2"}}\n{"key":"test3", "val": "Stryker was here!"}\n');
  });
});