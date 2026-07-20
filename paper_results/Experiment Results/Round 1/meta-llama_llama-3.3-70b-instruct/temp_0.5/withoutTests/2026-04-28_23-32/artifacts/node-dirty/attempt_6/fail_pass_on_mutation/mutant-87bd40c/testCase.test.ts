import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should emit read_close event when closing', async () => {
    const path = 'test.db';
    const dirty = new Dirty(path);
    await new Promise(resolve => dirty.once('load', resolve));
    let readCloseEmitted = false;
    dirty.on('read_close', () => {
      readCloseEmitted = true;
    });
    dirty.close();
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(readCloseEmitted).toBe(true);
  }, 10000);
});