import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op.length() with retain object', () => {
  it('should return 1 when retain is an object', () => {
    const op = { retain: { someProperty: 'value' } };
    expect(Op.length(op)).toEqual(1);
  });
});