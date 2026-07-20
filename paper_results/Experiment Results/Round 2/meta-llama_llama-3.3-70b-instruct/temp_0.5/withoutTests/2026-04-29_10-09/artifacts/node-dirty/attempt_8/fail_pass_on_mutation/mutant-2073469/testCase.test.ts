import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit "drain" event when there are no in-flight writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      dirty.set('key', 'value');
      let drainEventReceived = false;
      let otherEventReceived = false;
      dirty.on('drain', () => {
        drainEventReceived = true;
      });
      dirty.on('unknown', () => {
        otherEventReceived = true;
      });
      dirty.emit('unknown');
      setTimeout(() => {
        expect(drainEventReceived).toBe(true);
        expect(otherEventReceived).toBe(true);
        fs.unlink(dbPath, () => {
          done();
        });
      }, 100);
    });
  });
});