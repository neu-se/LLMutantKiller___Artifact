import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not load a row without a key in the original code but load it in the mutated code', (done) => {
    const tempDir = path.join(__dirname, 'temp');
    const filePath = path.join(tempDir, 'test.db');

    // Create a temporary directory and file
    fs.mkdirSync(tempDir);
    fs.writeFileSync(filePath, '{"key":"test","val":"value"}\n{"val":"value2"}\n');

    const dirty = new Dirty(filePath);

    dirty.on('load', (size) => {
      expect(size).toBe(1);
      const value = dirty.get('test');
      expect(value).toBe('value');
      const value2 = dirty.get('value2');
      expect(value2).toBeUndefined();
      fs.unlinkSync(filePath);
      fs.rmdirSync(tempDir);
      done();
    });

    dirty.on('error', (err) => {
      throw err;
    });
  });
});