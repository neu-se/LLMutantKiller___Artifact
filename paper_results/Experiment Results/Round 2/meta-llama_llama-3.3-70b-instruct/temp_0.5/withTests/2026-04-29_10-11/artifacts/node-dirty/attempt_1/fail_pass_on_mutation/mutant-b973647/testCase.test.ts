import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { promisify } from 'util';
import rimraf from 'rimraf';

const rm = promisify(rimraf);

describe('Dirty', () => {
  it('should emit an error event with a valid string when an error occurs while reading the file', async () => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(typeof err.message).toBe('string');
    });
    await rm(filePath);
    fs.writeFileSync(filePath, 'invalid json');
    await new Promise((resolve) => db.on('load', resolve));
  });
});