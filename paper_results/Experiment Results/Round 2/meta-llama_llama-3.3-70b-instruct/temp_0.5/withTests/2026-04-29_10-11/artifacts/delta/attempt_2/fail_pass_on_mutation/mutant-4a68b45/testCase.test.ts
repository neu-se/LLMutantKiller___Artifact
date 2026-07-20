import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op', () => {
  it('length() with mutated retain', () => {
    const op = { retain: { a: 1 } };
    expect(Op.length(op)).toEqual(1);
  });
});