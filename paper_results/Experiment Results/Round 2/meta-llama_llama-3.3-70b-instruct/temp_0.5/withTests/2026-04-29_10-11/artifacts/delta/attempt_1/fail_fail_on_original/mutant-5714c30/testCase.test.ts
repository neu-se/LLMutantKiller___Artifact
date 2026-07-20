// testCase.test.ts
import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('transform', () => {
  it('should throw an error when thisData is null and otherData is an object', () => {
    const delta1 = new Delta().retain(null);
    const delta2 = new Delta().retain({ test: 'data' });
    expect(() => delta1.transform(delta2)).toThrowError('no handlers for embed type "undefined"');
  });
});