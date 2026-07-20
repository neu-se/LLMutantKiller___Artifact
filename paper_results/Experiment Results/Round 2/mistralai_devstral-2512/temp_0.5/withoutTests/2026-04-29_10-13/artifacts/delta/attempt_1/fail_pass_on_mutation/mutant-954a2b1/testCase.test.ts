import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with retain operation', () => {
  it('should correctly handle null firstOther in compose', () => {
    const delta1 = new Delta().insert('test');
    const delta2 = new Delta().retain(null as any);

    expect(() => {
      delta1.compose(delta2);
    }).not.toThrow();
  });
});