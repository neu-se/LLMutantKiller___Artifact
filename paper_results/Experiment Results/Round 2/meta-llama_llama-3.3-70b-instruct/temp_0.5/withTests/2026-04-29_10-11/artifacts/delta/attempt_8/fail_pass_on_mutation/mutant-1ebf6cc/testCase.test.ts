import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op.ts';

describe('Op length function', () => {
  it('should return the correct length for an op with retain and object value', () => {
    const op = { retain: { test: 'object' } };
    expect(Op.length(op)).toEqual(1);
  });

  it('should return the correct length for an op with retain and object value and not throw an error for typeof op.retain === "" in the mutated code', () => {
    const op = { retain: { test: 'object' } };
    expect(() => {
      const temp = typeof op.retain;
      op.retain = "";
      Op.length(op);
      op.retain = temp;
    }).not.toThrowError();
  });
});