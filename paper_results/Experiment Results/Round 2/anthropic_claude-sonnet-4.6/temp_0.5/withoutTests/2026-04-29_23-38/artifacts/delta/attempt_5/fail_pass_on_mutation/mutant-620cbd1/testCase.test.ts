import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose', () => {
  it('insert followed by retain composes correctly', () => {
    const a = new Delta().insert('hello');
    const b = new Delta().retain(5).insert(' world');
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'hello world' }]);
  });
});