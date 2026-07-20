import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('compose optimization correctly returns early skipping remaining other ops', () => {
    const a = new Delta([{retain:2},{insert:'X'},{retain:3}]);
    const b = new Delta([{retain:2},{retain:3},{delete:1}]);
    const result = a.compose(b);
    expect(result.ops).toEqual([{retain:2},{insert:'X'}]);
  });
});