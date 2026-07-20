import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit "drain" event when there are no in-flight writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      dirty.set('key', 'value');
      let events = [];
      dirty.on('drain', () => {
        events.push('drain');
      });
      dirty.on('error', () => {
        events.push('error');
      });
      setTimeout(() => {
        expect(events).toEqual(['drain']);
        fs.unlink(dbPath, () => {
          done();
        });
      }, 100);
    });
  });
});