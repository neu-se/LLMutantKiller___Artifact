import { readFile } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from 'fs';
import * as path from 'path';

describe('jsonfile', () => {
  it('should correctly handle encoding option when passed as a string', async () => {
    const filePath = 'test.json';
    const data = { foo: 'bar' };
    await fs.promises.writeFile(filePath, JSON.stringify(data), 'utf8');
    const result = await readFile(filePath, 'utf8');
    expect(result).toEqual(data);
    const result2 = await readFile(filePath, 'utf8');
    expect(result2).toEqual(data);
    await fs.promises.unlink(filePath);
    await fs.promises.writeFile(filePath, Buffer.from([0xff, 0xfe, 0x26, 0x00, 0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'binary');
    try {
      const result3 = await readFile(filePath, 'utf8');
      expect(result3).not.toBeInstanceOf(Buffer);
    } catch (error) {
      expect.fail('Expected no error to be thrown');
    } finally {
      await fs.promises.unlink(filePath);
    }
  });
});