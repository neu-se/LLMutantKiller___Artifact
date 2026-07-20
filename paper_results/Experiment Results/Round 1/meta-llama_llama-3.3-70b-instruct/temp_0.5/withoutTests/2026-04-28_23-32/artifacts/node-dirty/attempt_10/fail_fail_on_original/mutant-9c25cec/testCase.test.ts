import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should throw an error when loading a row without a key', (done) => {
    const tempDir = path.join(__dirname, 'temp');
    const filePath = path.join(tempDir, 'test.db');

    // Create a temporary directory and file
    fs.mkdirSync(tempDir);
    fs.writeFileSync(filePath, '{"key":"test","val":"value"}\n{"val":"value2"}\n');

    const dirty = new Dirty(filePath);

    dirty.on('error', (err) => {
      expect(err.message).toBe('Could not load corrupted row: {"val":"value2"}');
      fs.unlinkSync(filePath);
      fs.rmdirSync(tempDir);
      done();
    });

    dirty.on('load', () => {
      throw new Error('Expected an error event, but got a load event instead');
    });
  });
});