import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should throw an error when loading a corrupted row without a key', () => {
    const tempDir = fs.mkdtempSync(path.join(__dirname, 'dirty-'));
    const dbPath = path.join(tempDir, 'test.db');
    const dirty = new Dirty(dbPath);

    const corruptedRow = '{"val": "test"}\n';
    fs.writeFileSync(dbPath, corruptedRow);

    expect(() => {
      dirty.on('load', () => {
        expect(dirty.size()).toBe(0);
      });
    }).toThrowError();
  });
});