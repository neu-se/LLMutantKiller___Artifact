import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fs } from 'fs';

describe('dirty db', function () {
  it('should not emit drain when there are in-flight writes', async function () {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
    });
    db.on('drain', () => {
      throw new Error('Drain event should not be emitted when there are in-flight writes');
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await fs.unlink(file);
  });
});