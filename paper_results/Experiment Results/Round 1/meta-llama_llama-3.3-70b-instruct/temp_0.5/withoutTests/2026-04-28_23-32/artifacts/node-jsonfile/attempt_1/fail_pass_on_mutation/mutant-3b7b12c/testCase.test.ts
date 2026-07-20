import { readFile } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from 'fs';
import * as path from 'path';

describe('jsonfile', () => {
  it('should correctly parse JSON file with encoding option', async () => {
    const filePath = 'test.json';
    const data = { foo: 'bar' };
    await fs.promises.writeFile(filePath, JSON.stringify(data), 'utf8');
    const result = await readFile(filePath, 'utf8');
    expect(result).toEqual(data);
    await fs.promises.unlink(filePath);
  });
});