import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit error event with correct event name when loading corrupted row', (done) => {
    const dirty = new Dirty('test.db');
    let eventEmitted = false;

    dirty.on('error', (err) => {
      expect(eventEmitted).toBe(false);
      eventEmitted = true;
      expect(typeof dirty.emit).toBe('function');
      expect(dirty.emit('error', new Error('test'))).toBe(true);
      expect(dirty.emit('error', new Error('test'))).toBe(true);
      expect(dirty.emit('non-existent-event', new Error('test'))).toBe(false);
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