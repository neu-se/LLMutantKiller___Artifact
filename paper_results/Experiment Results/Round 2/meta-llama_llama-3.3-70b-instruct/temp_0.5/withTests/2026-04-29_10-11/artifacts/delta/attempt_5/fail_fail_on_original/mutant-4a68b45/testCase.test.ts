import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op', () => {
  it('length() with different retain types', () => {
    const op = { retain: {} };
    expect(Op.length(op)).not.toEqual(1);
  });
});