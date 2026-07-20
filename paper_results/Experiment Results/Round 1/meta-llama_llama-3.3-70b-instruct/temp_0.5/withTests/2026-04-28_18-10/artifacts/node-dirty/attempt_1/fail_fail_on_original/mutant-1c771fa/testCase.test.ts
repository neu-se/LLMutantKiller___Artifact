import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import { promises as fs } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should emit an error when a corrupted row is encountered', async () => {
    const filePath = 'test.dirty';
    await fs.writeFile(filePath, '{"key":"x","val":"y"}\n{"key":"p"');

    const db = new Dirty(filePath);
    await new Promise((resolve, reject) => {
      db.on('load', () => {
        reject(new Error('Expected error event'));
      });
      db.on('error', (err) => {
        resolve();
      });
    });

    await rimraf(filePath);
  });
});