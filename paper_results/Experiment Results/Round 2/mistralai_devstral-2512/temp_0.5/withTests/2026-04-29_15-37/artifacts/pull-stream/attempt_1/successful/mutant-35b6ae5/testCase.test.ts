import { createReadStream } from 'fs';
import { join } from 'path';
import pull from '../';

describe('prop function with regex key', () => {
  it('should return the first match when regex exec succeeds', (done) => {
    const prop = require('../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js');
    const testRegex = /test/;
    const testData = 'this is a test string';
    const expectedMatch = 'test';

    const getProp = prop(testRegex);
    const result = getProp(testData);

    expect(result).toBe(expectedMatch);
    done();
  });
});