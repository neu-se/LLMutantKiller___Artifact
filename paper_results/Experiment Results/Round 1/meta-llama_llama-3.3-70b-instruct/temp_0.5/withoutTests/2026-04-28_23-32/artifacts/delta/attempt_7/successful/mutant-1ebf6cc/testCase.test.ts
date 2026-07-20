import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op', () => {
  it('should return the correct length for an op with a retain object and a string insert', () => {
    const op: Op = {
      retain: { foo: 'bar' },
      insert: 'test'
    };

    expect(Op.length(op)).toBe(1);
  });
});