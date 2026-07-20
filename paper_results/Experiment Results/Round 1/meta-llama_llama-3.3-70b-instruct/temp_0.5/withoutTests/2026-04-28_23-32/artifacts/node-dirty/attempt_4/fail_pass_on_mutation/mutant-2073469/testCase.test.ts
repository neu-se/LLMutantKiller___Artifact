import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('emits "drain" event after writing to disk', (done) => {
    const dirty = new Dirty('test.db');
    let eventEmitted = false;
    dirty.on('drain', () => {
      eventEmitted = true;
    });
    dirty.set('key', 'value');
    dirty.close();
    dirty.on('error', () => {
      done.fail('Error event emitted');
    });
    setTimeout(() => {
      expect(eventEmitted).toBe(true);
      done();
    }, 100);
  });
});