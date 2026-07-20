import { Op } from '../../../../../../../../../../../subject_repositories/delta/src/Op.ts';

describe('Op length function', () => {
  it('should return the correct length for an op with retain and object value', () => {
    const op = { retain: { test: 'object' } };
    expect(Op.length(op)).toEqual(1);
  });
});