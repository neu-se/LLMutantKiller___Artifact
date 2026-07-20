import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit error event with correct event name when loading corrupted row', (done) => {
    const dirty = new Dirty('test.db');

    dirty.on('error', (err) => {
      expect(dirty.emit).toBeInstanceOf(Function);
      expect(dirty.listeners('error')).toHaveLength(1);
      done();
    });

    dirty.on('load', () => {
      dirty._load();
    });

    dirty.on('read_close', () => {
      fs.unlink('test.db', () => {});
    });

    fs.writeFileSync('test.db', '{"key":"test"}');
  });
});