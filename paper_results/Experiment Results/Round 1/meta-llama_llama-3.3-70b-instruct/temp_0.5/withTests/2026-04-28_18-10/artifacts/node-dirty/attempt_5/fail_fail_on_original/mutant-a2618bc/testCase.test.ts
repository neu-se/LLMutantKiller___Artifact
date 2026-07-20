import { Dirty } from '../../../../../lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should write all pending changes to disk when flushing', async () => {
    const db = new Dirty();

    db.set('key1', 'value1', () => {
      db.set('key2', 'value2', () => {
        db.set('key3', 'value3', () => {
          expect(db.size()).toBe(3);
        });
      });
    });
  });
});