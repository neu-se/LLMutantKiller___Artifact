import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op.length() with retain object', () => {
  it('should return length from retain object when retain is an object', () => {
    const op = { retain: { length: 5 } };
    expect(Op.length(op)).toEqual(5);
  });
});