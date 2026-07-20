import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should correctly handle file encoding', async () => {
    const tmpPath = path.join(__dirname, 'tmp');
    const filePath = path.join(tmpPath, 'test.dirty');
    fs.mkdirSync(tmpPath, { recursive: true });
    fs.writeFileSync(filePath, 'test', 'utf8');

    const dirty = new Dirty(filePath);
    await new Promise((resolve) => dirty.on('load', resolve));

    expect(() => {
      const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
      readStream.on('data', (chunk) => {
        expect(chunk).toBe('test');
      });
    }).not.toThrowError();
  });
});