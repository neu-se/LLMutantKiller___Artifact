import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with retain optimization', () => {
  it('should optimize composition when other delta starts with retain and has matching insert length', () => {
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta().retain(5).insert(' World');
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: 'Hello World' }];
    expect(result.ops).toEqual(expectedOps);
  });
});