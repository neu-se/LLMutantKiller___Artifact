import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not load a row without a key', (done) => {
    const tempDir = path.join(__dirname, 'temp');
    const filePath = path.join(tempDir, 'test.db');

    // Create a temporary directory and file
    fs.mkdirSync(tempDir);
    fs.writeFileSync(filePath, '{"val":"value"}\n');

    const dirty = new Dirty(filePath);

    dirty.on('load', (size) => {
      expect(size).toBe(0);
      fs.unlinkSync(filePath);
      fs.rmdirSync(tempDir);
      done();
    });

    dirty.on('error', (err) => {
      throw err;
    });
  });
});