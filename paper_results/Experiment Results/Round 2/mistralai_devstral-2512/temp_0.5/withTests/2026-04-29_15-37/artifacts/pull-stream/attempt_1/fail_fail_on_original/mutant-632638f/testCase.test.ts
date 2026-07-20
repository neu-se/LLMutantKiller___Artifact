import { createReadStream } from 'fs';
import { join } from 'path';
import pull from '../';

describe('prop function behavior', () => {
  it('should return a function that accesses the specified key when key is truthy and not a regexp', (done) => {
    const propFunc = pull.prop('testKey');
    const testData = { testKey: 'expectedValue' };
    const result = propFunc(testData);
    expect(result).toBe('expectedValue');
    done();
  });
});