// testCase.test.ts
import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should throw an error when thisData is null and otherData is an object', () => {
    Delta.registerEmbed('test', {
      compose: (a: any, b: any) => Object.assign({}, a, b),
      transform: (a: any, b: any) => Object.assign({}, a, b),
      invert: (a: any, b: any) => Object.assign({}, a, b),
    });
    const delta1 = new Delta().retain(null);
    const delta2 = new Delta().retain({ test: 'data2' });
    expect(() => delta1.transform(delta2)).toThrowError('no handlers for embed type "undefined"');
  });
});