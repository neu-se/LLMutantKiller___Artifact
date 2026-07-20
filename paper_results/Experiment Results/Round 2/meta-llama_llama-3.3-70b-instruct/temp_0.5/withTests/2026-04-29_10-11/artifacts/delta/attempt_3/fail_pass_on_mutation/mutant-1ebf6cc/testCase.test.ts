import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op.ts';

describe('Op length function', () => {
  it('should return the correct length for an op with retain and number value', () => {
    const op = { retain: 5 };
    expect(Op.length(op)).toEqual(5);
  });

  it('should return the correct length for an op with retain and object value in the original code', () => {
    const op = { retain: { test: 'object' } };
    expect(Op.length(op)).toEqual(1);
  });
});