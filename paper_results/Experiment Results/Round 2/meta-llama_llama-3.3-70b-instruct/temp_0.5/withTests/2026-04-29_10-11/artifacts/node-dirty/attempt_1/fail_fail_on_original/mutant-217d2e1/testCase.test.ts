import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import { promises as fsp } from 'fs';

describe('Dirty', function () {
  it('should handle corrupted rows correctly', async function () {
    const file = `${__dirname}/corrupted.dirty`;
    const db = new Dirty(file);

    const corruptedRow = '{"key":"test","val":';
    await fsp.writeFile(file, corruptedRow);

    db.on('error', (err) => {
      assert.strictEqual(err.message, `Could not load corrupted row: ${corruptedRow}`);
    });

    await new Promise((resolve) => db.on('load', resolve));
    await rimraf(file);
  });
});