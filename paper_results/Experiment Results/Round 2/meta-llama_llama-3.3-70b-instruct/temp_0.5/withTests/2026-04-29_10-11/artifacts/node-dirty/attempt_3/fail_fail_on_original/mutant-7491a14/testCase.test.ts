import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should correctly read the file when encoding is specified', async () => {
    const tmpPath = path.join(__dirname, 'tmp');
    const filePath = path.join(tmpPath, 'test.dirty');
    fs.mkdirSync(tmpPath, { recursive: true });
    fs.writeFileSync(filePath, 'test');

    const dirty = new Dirty(filePath);
    await new Promise((resolve) => dirty.on('load', resolve));

    // The test should pass on the original code and fail on the mutated code
    // because the mutated code does not specify the encoding when creating the read stream.
    expect(() => dirty._readStream.on('data', (chunk) => {
      expect(chunk.toString()).toBe('test');
    })).not.toThrowError();
  });
});