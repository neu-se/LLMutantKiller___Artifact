import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should correctly read and write data with utf-8 encoding', async () => {
    const tempDir = path.join(__dirname, 'temp');
    const filePath = path.join(tempDir, 'test.db');

    fs.mkdirSync(tempDir);

    const dirty = new Dirty(filePath);
    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve(true);
      });
    });

    const nonAsciiString = 'éàç';
    dirty.set('key', nonAsciiString, () => {
      dirty.close();
    });

    await new Promise((resolve) => {
      dirty.on('write_close', () => {
        resolve(true);
      });
    });

    const data = fs.readFileSync(filePath, 'utf8');
    expect(data).toContain(`{"key":"${nonAsciiString}"}`);
  });
});