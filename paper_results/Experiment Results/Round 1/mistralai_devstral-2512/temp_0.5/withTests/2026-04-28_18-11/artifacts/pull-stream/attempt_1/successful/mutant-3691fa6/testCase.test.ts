import { createReadStream } from 'fs';
import { join } from 'path';

describe('prop function with regex key', () => {
  it('should correctly handle regex objects as keys', () => {
    const prop = require('../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js');
    const testRegex = /test/;
    const testData = 'this is a test string';

    const getProp = prop(testRegex);
    const result = getProp(testData);

    expect(result).toBe('test');
  });
});