import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should emit an error when loading a corrupted row', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      expect(dirty.size()).toBe(0);
      fs.unlinkSync(dbPath);
      done();
    });

    fs.appendFileSync(dbPath, '{"key":"test2","val":null{"key":"test","val":null}');
  });
});