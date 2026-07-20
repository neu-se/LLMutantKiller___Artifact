import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';
import * as Buffer from 'buffer';

describe('stripBom function', () => {
  it('should not convert buffer to string when not necessary', () => {
    const buffer = Buffer.from('Hello, World!');
    const result = stripBom(buffer);
    expect(typeof result).toBe('string');
    expect(Buffer.from(result, 'utf8')).toEqual(buffer);
  });
});