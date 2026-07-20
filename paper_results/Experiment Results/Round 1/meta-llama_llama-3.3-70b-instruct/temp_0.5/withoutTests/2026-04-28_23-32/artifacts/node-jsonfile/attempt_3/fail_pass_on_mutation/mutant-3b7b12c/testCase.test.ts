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
    try {
      const result2 = await readFile(filePath, 'utf8');
      expect(result2).toEqual(data);
    } catch (error) {
      expect.fail('Expected no error to be thrown');
    }
    await fs.promises.unlink(filePath);
  });
});