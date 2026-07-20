import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('emits "drain" event after writing to disk', (done) => {
    const dirty = new Dirty('test.db');
    let drainCount = 0;
    dirty.on('drain', () => {
      drainCount++;
    });
    dirty.set('key', 'value');
    dirty.set('key2', 'value2');
    dirty.close();
    setTimeout(() => {
      expect(drainCount).toBe(1);
      done();
    }, 100);
  });
});