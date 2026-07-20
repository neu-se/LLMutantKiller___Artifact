import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from 'fs';
import * as path from 'path';

describe('jsonfile', () => {
  it('should correctly parse JSON file with encoding option', () => {
    const testFilePath = 'test.json';
    const testFileContent = 'Hello, World!';
    fs.writeFileSync(testFilePath, testFileContent);
    try {
      const result = readFileSync(testFilePath, 'utf8');
      expect(result).not.toBeInstanceOf(Object);
    } finally {
      fs.unlinkSync(testFilePath);
    }
  });
});