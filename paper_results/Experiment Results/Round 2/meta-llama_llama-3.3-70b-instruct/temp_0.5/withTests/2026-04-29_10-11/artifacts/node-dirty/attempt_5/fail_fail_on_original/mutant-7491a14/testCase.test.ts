import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should correctly handle buffer encoding', async () => {
    const tmpPath = path.join(__dirname, 'tmp');
    const filePath = path.join(tmpPath, 'test.dirty');
    fs.mkdirSync(tmpPath, { recursive: true });
    const buffer = Buffer.from('test', 'utf8');
    fs.writeFileSync(filePath, buffer);

    const dirty = new Dirty(filePath);
    await new Promise((resolve) => dirty.on('load', resolve));

    expect(() => {
      const readStream = fs.createReadStream(filePath);
      readStream.on('data', (chunk) => {
        expect(chunk.toString()).toBe('test');
      });
    }).not.toThrowError();
  });
});