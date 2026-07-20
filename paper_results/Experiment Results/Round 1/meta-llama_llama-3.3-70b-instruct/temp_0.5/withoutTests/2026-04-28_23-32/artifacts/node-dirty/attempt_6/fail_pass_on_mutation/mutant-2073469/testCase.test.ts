import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('emits "drain" event after writing to disk', (done) => {
    const dirty = new Dirty('test.db');
    let eventCount = 0;
    dirty.on('drain', () => {
      eventCount++;
    });
    dirty.set('key', 'value');
    dirty.close();
    setTimeout(() => {
      expect(eventCount).toBe(1);
      done();
    }, 100);
  });
});