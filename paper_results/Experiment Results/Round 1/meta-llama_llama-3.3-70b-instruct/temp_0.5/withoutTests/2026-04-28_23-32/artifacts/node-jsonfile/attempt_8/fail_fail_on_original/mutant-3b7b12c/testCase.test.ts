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
    await fs.promises.writeFile(filePath, JSON.stringify(data), 'utf8');
    const result3 = await readFile(filePath, 'utf8');
    expect(result3).toEqual(data);
    await fs.promises.unlink(filePath);
    await fs.promises.writeFile(filePath, JSON.stringify(data), 'utf8');
    const result4 = await readFile(filePath, 'utf8');
    expect(result4).toEqual(data);
    await fs.promises.unlink(filePath);
    await fs.promises.writeFile(filePath, JSON.stringify(data), 'utf8');
    try {
      const result5 = await readFile(filePath, ' invalid-encoding');
      expect(result5).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    } finally {
      await fs.promises.unlink(filePath);
    }
  });
});