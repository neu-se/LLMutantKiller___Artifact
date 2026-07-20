import * as fs from 'fs';
import * as path from 'path';
import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('jsonfile', () => {
  it('should use fs when graceful-fs is not available', () => {
    const file = 'test.json';
    const data = { test: 'data' };
    fs.writeFileSync(file, JSON.stringify(data));
    const result = readFileSync(file);
    expect(result).toEqual(data);
    fs.unlinkSync(file);
  });
});