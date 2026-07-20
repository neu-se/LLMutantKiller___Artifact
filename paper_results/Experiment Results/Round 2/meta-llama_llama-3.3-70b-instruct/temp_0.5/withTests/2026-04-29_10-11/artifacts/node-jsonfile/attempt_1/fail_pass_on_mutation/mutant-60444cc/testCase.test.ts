import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('stripBom function', () => {
  it('should not convert string to utf8 when content is not a buffer', () => {
    const content = 'Hello, World!';
    const result = stripBom(content);
    expect(result).toBe(content);
  });
});