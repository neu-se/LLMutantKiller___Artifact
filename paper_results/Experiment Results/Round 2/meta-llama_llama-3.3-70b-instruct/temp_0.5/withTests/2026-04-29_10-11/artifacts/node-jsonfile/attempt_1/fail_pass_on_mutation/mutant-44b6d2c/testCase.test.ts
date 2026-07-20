import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js'
import * as fs from 'fs'
import * as path from 'path'
import * as rimraf from 'rimraf'

describe('+ stripBom()', () => {
  it('should remove BOM from start of string', () => {
    const fileContent = '\uFEFF{"key": "value"}\uFEFF';
    const expectedContent = '{"key": "value"}\uFEFF';
    const result = stripBom(fileContent);
    expect(result).not.toBe(fileContent);
    expect(result).toBe(expectedContent);
  });
});