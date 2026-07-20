import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import { assert } from 'assert';

describe('Dirty', () => {
  it('should close the write stream when there are no in-flight writes', async () => {
    const file = 'test.dirty';
    await fsp.unlink(file).catch(() => {});

    const db = new Dirty(file);
    db.set('key', 'value');
    await new Promise((resolve) => db.on('drain', resolve));

    db.close();

    await new Promise((resolve) => db.on('write_close', resolve));

    assert.strictEqual(db._writeStream, null);
    await fsp.unlink(file);
  });
});