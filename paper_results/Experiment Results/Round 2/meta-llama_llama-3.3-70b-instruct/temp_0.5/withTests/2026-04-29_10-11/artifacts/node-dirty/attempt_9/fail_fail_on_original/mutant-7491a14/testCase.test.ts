import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should throw an error when reading a file without specifying encoding', async () => {
    const tmpPath = path.join(__dirname, 'tmp');
    const filePath = path.join(tmpPath, 'test.dirty');
    fs.mkdirSync(tmpPath, { recursive: true });
    fs.writeFileSync(filePath, 'test', 'utf8');

    const dirty = new Dirty(filePath);
    await new Promise((resolve) => dirty.on('load', resolve));

    expect(() => {
      const readStream = fs.createReadStream(filePath);
      readStream.on('data', (chunk) => {
        expect(chunk.toString()).toBe('test');
      });
    }).toThrowError();
  });
});