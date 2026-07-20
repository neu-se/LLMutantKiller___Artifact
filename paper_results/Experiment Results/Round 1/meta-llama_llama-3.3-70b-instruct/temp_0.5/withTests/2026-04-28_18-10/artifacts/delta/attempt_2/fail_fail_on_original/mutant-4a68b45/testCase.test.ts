import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op length', () => {
  it('should return correct length for retain with object', () => {
    const op = { retain: { test: 'object' } };
    expect(Op.length(op)).toBeUndefined();
  });
});