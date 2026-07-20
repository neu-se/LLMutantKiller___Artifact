import { Dirty } from '../../lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should write all pending changes to disk when flushing', async () => {
    const tmpFile = 'tmp.dirty';
    const db = new Dirty(tmpFile);

    db.set('key1', 'value1', () => {
      db.set('key2', 'value2', () => {
        db.set('key3', 'value3', () => {
          expect(db.size()).toBe(3);
        });
      });
    });

    await new Promise((resolve) => {
      db.on('drain', resolve);
    });

    db.set('key4', 'value4', () => {
      expect(db.size()).toBe(4);
    });

    await new Promise((resolve) => {
      db.on('drain', resolve);
    });
  });
});