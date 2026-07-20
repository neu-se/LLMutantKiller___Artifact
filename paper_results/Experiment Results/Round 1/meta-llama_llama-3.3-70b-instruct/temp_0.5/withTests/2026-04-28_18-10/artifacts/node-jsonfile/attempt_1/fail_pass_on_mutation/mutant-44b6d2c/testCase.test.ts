import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('stripBom function', () => {
  it('should remove BOM from the beginning of the string', () => {
    const fileContent = '\uFEFF{"key": "value"}';
    const expectedContent = '{"key": "value"}';

    const result = stripBom(fileContent);
    expect(result).toBe(expectedContent);
  });
});