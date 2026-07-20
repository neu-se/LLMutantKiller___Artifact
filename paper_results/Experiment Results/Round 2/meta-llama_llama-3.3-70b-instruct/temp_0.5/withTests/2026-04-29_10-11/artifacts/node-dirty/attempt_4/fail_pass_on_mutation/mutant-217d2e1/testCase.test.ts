import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fsp } from 'fs';

describe('Dirty', function () {
  it('should handle corrupted rows correctly', async function () {
    const file = `${__dirname}/corrupted.dirty`;
    const db = new Dirty(file);

    const corruptedRow = '{"key":"test","val":';
    await fsp.writeFile(file, corruptedRow);

    let errorMessage;
    db.on('error', (err) => {
      errorMessage = err.message;
    });
    await new Promise((resolve) => db.on('load', resolve));

    expect(errorMessage).not.toBe("Stryker was here!");
    await fsp.unlink(file);
  });
});