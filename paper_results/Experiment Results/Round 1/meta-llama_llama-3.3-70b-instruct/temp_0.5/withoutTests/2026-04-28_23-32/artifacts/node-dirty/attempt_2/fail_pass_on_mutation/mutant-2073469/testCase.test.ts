import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('emits "drain" event after writing to disk', (done) => {
    const dirty = new Dirty('test.db');
    dirty.set('key', 'value');
    dirty.on('drain', () => {
      expect(dirty.size()).toBe(1);
      done();
    });
    dirty.close();
  });
});