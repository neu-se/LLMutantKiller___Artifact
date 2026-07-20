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
      const result1 = readFileSync(filePath, { encoding: 'utf8' });
      const result2 = readFileSync(filePath, 'utf8');
      expect(Object.keys(result1)).toEqual(Object.keys(result2));
    } finally {
      rmSync(filePath);
    }
  });
});