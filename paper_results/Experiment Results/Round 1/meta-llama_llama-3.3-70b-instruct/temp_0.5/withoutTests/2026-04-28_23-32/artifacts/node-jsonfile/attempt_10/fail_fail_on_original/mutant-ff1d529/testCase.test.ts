import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';
import { rmSync } from 'fs';
import { join } from 'path';

describe('jsonfile', () => {
  it('should correctly parse json file with encoding option', () => {
    const filePath = join(__dirname, 'test.json');
    const content = '{"key": "value"}';
    const fs = require('fs');
    fs.writeFileSync(filePath, content, 'utf8');

    try {
      const result1 = readFileSync(filePath, 'utf8');
      const result2 = readFileSync(filePath, {});
      expect(result1).not.toEqual(result2);
    } finally {
      rmSync(filePath);
    }
  });
});