import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('emits "drain" event after writing to disk', (done) => {
    const dirty = new Dirty('test.db');
    let eventName = '';
    dirty.on('drain', () => {
      eventName = 'drain';
    });
    dirty.set('key', 'value');
    dirty.close();
    setTimeout(() => {
      expect(eventName).toBe('drain');
      dirty.removeAllListeners();
      dirty.on('drain', () => {
        done.fail('Unexpected "drain" event');
      });
      dirty.on('error', () => {
        done();
      });
      dirty.close();
    }, 100);
  });
});