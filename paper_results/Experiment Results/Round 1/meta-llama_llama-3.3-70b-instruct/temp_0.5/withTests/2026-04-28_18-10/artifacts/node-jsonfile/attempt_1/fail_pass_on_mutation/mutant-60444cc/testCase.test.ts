import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';
import * as fs from 'fs';

describe('stripBom', () => {
  it('should handle Buffer correctly', () => {
    const buffer = Buffer.from('\uFEFFHello, World!');
    const result = stripBom(buffer);
    expect(result).toBe('Hello, World!');
  });
});