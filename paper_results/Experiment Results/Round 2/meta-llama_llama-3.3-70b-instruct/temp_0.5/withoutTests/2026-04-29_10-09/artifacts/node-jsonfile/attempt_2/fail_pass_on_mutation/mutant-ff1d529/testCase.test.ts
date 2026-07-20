import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from 'fs';
import * as path from 'path';

describe('jsonfile', () => {
  it('should correctly parse JSON file with encoding option', () => {
    const testFilePath = 'test.json';
    const testFileContent = '{"key": "value"}';
    fs.writeFileSync(testFilePath, testFileContent);
    try {
      const result = readFileSync(testFilePath, 'utf8');
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('key', 'value');
    } finally {
      fs.unlinkSync(testFilePath);
    }
  });
});