import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { rm } from 'rimraf';

describe('Dirty', () => {
  it('emits drain event when there are no in-flight writes', async () => {
    const dbPath = 'test.db';
    const db = new Dirty(dbPath);
    await new Promise(resolve => db.once('load', resolve));
    db.set('key', 'value');
    await new Promise(resolve => db.once('drain', resolve));
    db.set('key', 'new value');
    await new Promise(resolve => db.once('drain', resolve));
    expect(db.size()).toBe(1);
    rm(dbPath, () => {});
  });
});