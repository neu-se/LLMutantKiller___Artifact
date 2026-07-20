import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from 'fs';
import * as path from 'path';

describe('jsonfile', () => {
  it('should correctly handle encoding option when passed as a string', () => {
    const testFilePath = 'test.json';
    const testFileContent = '{"key": "value"}';
    fs.writeFileSync(testFilePath, testFileContent);
    try {
      const result = readFileSync(testFilePath, 'utf8');
      expect(typeof result).toBe('object');
      const result2 = readFileSync(testFilePath, 'utf8');
      expect(typeof result2).toBe('object');
      const buffer = fs.readFileSync(testFilePath);
      const result3 = JSON.parse(buffer.toString('utf8'));
      expect(result).toEqual(result3);
    } finally {
      fs.unlinkSync(testFilePath);
    }
  });
});