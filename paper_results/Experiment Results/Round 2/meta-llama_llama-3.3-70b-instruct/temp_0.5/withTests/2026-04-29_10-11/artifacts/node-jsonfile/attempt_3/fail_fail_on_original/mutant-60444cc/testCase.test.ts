import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';
import * as Buffer from 'buffer';

describe('stripBom function', () => {
  it('should not convert string to utf8 when content is a string', () => {
    const content = 'Hello, World!';
    const result = stripBom(content);
    expect(result).toBe(content);
    expect(typeof result).toBe('string');
    expect(Buffer.isBuffer(result)).toBe(false);
  });
});