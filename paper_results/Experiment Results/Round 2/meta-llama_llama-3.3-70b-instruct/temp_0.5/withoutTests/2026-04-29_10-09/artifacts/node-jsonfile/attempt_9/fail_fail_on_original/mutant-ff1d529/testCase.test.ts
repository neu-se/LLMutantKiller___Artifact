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
      const result2 = readFileSync(testFilePath, 'utf8');
      expect(result1).toEqual(result2);
      const result3 = readFileSync(testFilePath, { encoding: 'utf8' });
      expect(result3).toEqual(result1);
      if (result1 !== result3) {
        throw new Error('Results do not match');
      }
    } finally {
      fs.unlinkSync(testFilePath);
    }
  });
});