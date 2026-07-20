import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op.ts';

describe('Op length function', () => {
  it('should return the correct length for an op with retain and object value', () => {
    const op = { retain: { test: 'object' } };
    expect(Op.length(op)).toEqual(1);
  });

  it.skip('should throw an error for an op with retain and null value in the mutated code', () => {
    const op = { retain: null };
    expect(() => Op.length(op)).toThrowError();
  });
});