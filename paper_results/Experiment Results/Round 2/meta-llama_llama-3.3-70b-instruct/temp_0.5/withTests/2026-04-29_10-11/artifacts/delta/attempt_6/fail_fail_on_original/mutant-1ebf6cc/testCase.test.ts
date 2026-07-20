import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op.ts';

describe('Op length function', () => {
  it('should throw an error for an op with retain and undefined value in the mutated code', () => {
    const op = { retain: undefined };
    expect(() => Op.length(op)).toThrowError();
  });
});