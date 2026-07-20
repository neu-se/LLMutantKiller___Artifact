import { Op } from '../../../../../src/Op';

describe('Op', () => {
  it('length function should handle different types of ops', () => {
    expect(Op.length({ delete: 5 })).toEqual(5);
    expect(Op.length({ retain: 2 })).toEqual(2);
    expect(Op.length({ insert: 'text' })).toEqual(4);
    expect(Op.length({ insert: { embed: 2 } })).toEqual(1);
    expect(Op.length({ retain: { embed: 2 } })).not.toEqual(1); // This should fail for the mutated code
  });
});