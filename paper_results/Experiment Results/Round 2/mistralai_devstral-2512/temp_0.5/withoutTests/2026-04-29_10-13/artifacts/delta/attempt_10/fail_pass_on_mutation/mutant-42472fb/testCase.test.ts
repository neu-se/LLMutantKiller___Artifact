import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with retain optimization', () => {
  it('should optimize composition when other delta starts with retain and has exact match', () => {
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta().retain(5).insert('!');
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: 'Hello!' }];
    expect(result.ops).toEqual(expectedOps);
  });
});