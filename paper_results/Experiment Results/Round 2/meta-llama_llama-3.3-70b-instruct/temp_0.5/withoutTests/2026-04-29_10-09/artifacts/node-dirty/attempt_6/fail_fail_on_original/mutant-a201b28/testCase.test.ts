import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit error event with correct event name when loading corrupted row', (done) => {
    const dirty = new Dirty('test.db');
    let errorEventName = '';

    dirty.on('error', (err) => {
      errorEventName = 'error';
      expect(dirty.emit).toBeInstanceOf(Function);
      expect(dirty.emit('error', new Error('test'))).toBe(true);
      expect(dirty.emit('', new Error('test'))).toBe(false);
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