import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op.length() with retain object', () => {
  it('should return 1 for retain with non-null object', () => {
    const op = { retain: { key: 'value' } };
    expect(Op.length(op)).toEqual(1);
  });
});