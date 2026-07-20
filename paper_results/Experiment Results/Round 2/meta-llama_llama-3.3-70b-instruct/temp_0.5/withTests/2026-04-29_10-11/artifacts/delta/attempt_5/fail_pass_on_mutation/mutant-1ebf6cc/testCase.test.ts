import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op.ts';

describe('Op length function', () => {
  it('should return the correct length for an op with retain and object value', () => {
    const op = { retain: { test: 'object' } };
    expect(Op.length(op)).toEqual(1);
  });

  it('should return the correct length for an op with retain and number value', () => {
    const op = { retain: 5 };
    expect(Op.length(op)).toEqual(5);
  });

  it('should return the correct length for an op with insert and string value', () => {
    const op = { insert: 'test' };
    expect(Op.length(op)).toEqual(4);
  });

  it('should return the correct length for an op with delete and number value', () => {
    const op = { delete: 5 };
    expect(Op.length(op)).toEqual(5);
  });

  it('should return the correct length for an op with insert and object value', () => {
    const op = { insert: { embed: 1 } };
    expect(Op.length(op)).toEqual(1);
  });
});