import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Op', () => {
  it('length function should handle different types of ops', () => {
    expect(Op.length({ delete: 5 })).toEqual(5);
    expect(Op.length({ retain: 2 })).toEqual(2);
    expect(Op.length({ insert: 'text' })).toEqual(4);
    expect(Op.length({ insert: { embed: 2 } })).toEqual(1);
    const op = { retain: { embed: 2 } };
    expect(Op.length(op)).toEqual(1);
    expect(() => {
      if (typeof op.retain === 'object' && op.retain !== null) {
        // no-op
      } else {
        throw new Error('Expected op.retain to be an object');
      }
    }).not.toThrowError('Expected op.retain to be an object');
    expect(() => {
      if (typeof op.retain === "") {
        throw new Error('Mutation detected');
      }
    }).toThrowError('Mutation detected');
  });
});