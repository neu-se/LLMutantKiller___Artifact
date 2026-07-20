import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('emits drain event after writing to file and waiting', async () => {
    const dbPath = 'test.db';
    const db = new Dirty(dbPath);
    await new Promise(resolve => db.once('load', resolve));
    let drainCount = 0;
    db.on('drain', () => drainCount++);
    db.set('key', 'value', () => {
      db.set('key2', 'value2', () => {
        db.set('key3', 'value3');
      });
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    expect(drainCount).toBeGreaterThan(0);
    fs.unlinkSync(dbPath);
  });
});