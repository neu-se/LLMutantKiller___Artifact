import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from 'fs';
import * as path from 'path';

describe('jsonfile', () => {
  it('should correctly handle encoding option when passed as a string', () => {
    const testFilePath = 'test.json';
    const testFileContent = '{"key": "value"}';
    fs.writeFileSync(testFilePath, testFileContent);
    try {
      const result1 = readFileSync(testFilePath, 'utf8');
      const result2 = readFileSync(testFilePath, { encoding: 'utf8' });
      expect(typeof result1).toBe('object');
      expect(typeof result2).toBe('object');
      expect(result1).toEqual(result2);
    } finally {
      fs.unlinkSync(testFilePath);
    }
  });
});