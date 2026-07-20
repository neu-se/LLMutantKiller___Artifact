import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert()', () => {
  it('test mutation', () => {
    const delta = new Delta([{ retain: 1, delete: false as any }]);
    const base = new Delta().insert('a');
    const result = delta.invert(base);
    expect(result).toEqual(new Delta().retain(1));
  });
});