import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fs } from 'fs';

describe('dirty db', function () {
  it('should not emit drain when there are in-flight writes', async function () {
    const file = 'test.dirty';
    const db = new Dirty(file);
    let drainCount = 0;
    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
    });
    db.on('drain', () => {
      drainCount++;
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(drainCount).toBeLessThan(2);
    await fs.unlink(file);
  });
});