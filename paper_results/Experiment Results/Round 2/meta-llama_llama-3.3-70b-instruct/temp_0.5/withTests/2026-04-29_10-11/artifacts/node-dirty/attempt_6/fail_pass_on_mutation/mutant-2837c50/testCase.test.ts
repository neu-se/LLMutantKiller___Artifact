import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fsp } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should close the database when the drain event is emitted', async () => {
    const filePath = join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);
    let closed = false;
    db.on('write_close', () => {
      closed = true;
    });
    db.set('key', 'value');
    await new Promise((resolve) => {
      db.on('drain', () => {
        db.close();
        resolve(true);
      });
    });
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });
    expect(closed).toBe(true);
  });
});