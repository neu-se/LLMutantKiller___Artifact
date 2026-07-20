import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('emits drain event after writing to file', async () => {
    const dbPath = 'test.db';
    const db = new Dirty(dbPath);
    await new Promise(resolve => db.once('load', resolve));
    let drainCount = 0;
    db.on('drain', () => drainCount++);
    db.set('key', 'value');
    await new Promise(resolve => {
      setTimeout(() => {
        expect(drainCount).toBeGreaterThan(0);
        resolve();
      }, 100);
    });
    fs.unlinkSync(dbPath);
  });
});