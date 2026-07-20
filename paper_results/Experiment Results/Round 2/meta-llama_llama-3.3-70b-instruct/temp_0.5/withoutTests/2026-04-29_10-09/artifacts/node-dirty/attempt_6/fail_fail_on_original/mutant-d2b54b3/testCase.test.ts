import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('emits drain event after writing to file and closing', async () => {
    const dbPath = 'test.db';
    const db = new Dirty(dbPath);
    await new Promise(resolve => db.once('load', resolve));
    db.set('key', 'value');
    db.close();
    await new Promise(resolve => db.once('write_close', resolve));
    expect(db.size()).toBe(1);
    let drainEmitted = false;
    db.on('drain', () => drainEmitted = true);
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(drainEmitted).toBe(true);
    fs.unlinkSync(dbPath);
  });
});