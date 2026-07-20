import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('emits "drain" event with the correct event name', (done) => {
    const dirty = new Dirty('test.db');
    let eventName = '';
    dirty.on('drain', () => {
      eventName = 'drain';
    });
    dirty.set('key', 'value');
    dirty.close();
    setTimeout(() => {
      expect(eventName).toBe('drain');
      done();
    }, 100);
  });
});