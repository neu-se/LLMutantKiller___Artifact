// testCase.test.ts
import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should return correct result when thisData is an object and otherData is an object', () => {
    Delta.registerEmbed('test', {
      compose: (a: any, b: any) => Object.assign({}, a, b),
      transform: (a: any, b: any) => {
        if (typeof a === 'object' && typeof b === 'object' && Object.keys(a).length > 0 && Object.keys(b).length > 0) {
          return { ...a, ...b };
        } else {
          throw new Error('Invalid input types');
        }
      },
      invert: (a: any, b: any) => Object.assign({}, a, b),
    });
    const delta1 = new Delta().retain({ test: 'data1' });
    const delta2 = new Delta().retain({ test: 'data2' });
    const result = delta1.transform(delta2);
    expect(result.ops[0].retain).toEqual({ test: 'data1data2' });
  });
});