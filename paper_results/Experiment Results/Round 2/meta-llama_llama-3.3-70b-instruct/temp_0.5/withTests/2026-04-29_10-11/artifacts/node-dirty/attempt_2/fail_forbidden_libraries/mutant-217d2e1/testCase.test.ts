import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fsp } from 'fs';
import { expect } from '@jest/globals';

describe('Dirty', function () {
  it('should handle corrupted rows correctly', async function () {
    const file = `${__dirname}/corrupted.dirty`;
    const db = new Dirty(file);

    const corruptedRow = '{"key":"test","val":';
    await fsp.writeFile(file, corruptedRow);

    await expect(new Promise((resolve, reject) => {
      db.on('error', (err) => {
        resolve(err.message);
      });
      db.on('load', () => {
        reject('No error was thrown');
      });
    })).resolves.toEqual(`Could not load corrupted row: ${corruptedRow}`);
    await fsp.unlink(file);
  });
});