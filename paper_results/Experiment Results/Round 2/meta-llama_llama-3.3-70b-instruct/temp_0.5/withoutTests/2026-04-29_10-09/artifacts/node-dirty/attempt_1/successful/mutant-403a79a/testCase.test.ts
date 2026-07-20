import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';

describe('Dirty', () => {
  it('should emit an error with a meaningful message for empty lines in the database', () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    const errorMessage = 'Empty lines never appear in a healthy database';

    dirty.on('error', (err) => {
      expect(err.message).toBe(errorMessage);
    });

    fs.appendFileSync(dbPath, '\n');

    dirty.on('load', () => {
      fs.unlinkSync(dbPath);
    });

    expect(() => {
      return new Promise((resolve) => {
        dirty.on('error', () => {
          resolve();
        });
      });
    }).resolves;
  });
});