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
      expect(typeof result1).toBe('object');
      const result2 = readFileSync(testFilePath, 'utf8');
      expect(typeof result2).toBe('object');
      const result3 = readFileSync(testFilePath, { encoding: 'utf8' });
      expect(typeof result3).toBe('object');
      const result4 = readFileSync(testFilePath, 'utf8');
      expect(typeof result4).toBe('object');
    } finally {
      fs.unlinkSync(testFilePath);
    }
  });
});