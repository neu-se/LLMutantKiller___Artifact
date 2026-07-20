import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op.length() with retain object', () => {
  it('should handle retain with object type correctly', () => {
    const op = { retain: { type: 'embed' } };
    expect(Op.length(op)).toEqual(1);
  });
});