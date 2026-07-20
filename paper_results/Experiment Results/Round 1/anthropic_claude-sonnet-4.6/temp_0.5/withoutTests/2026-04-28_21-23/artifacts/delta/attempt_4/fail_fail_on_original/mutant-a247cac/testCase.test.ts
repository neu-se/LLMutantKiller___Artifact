import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('compose optimization fires when last pushed op equals newOp', () => {
    const a = new Delta([{ insert: 'AB' }, { retain: 2 }]);
    const b = new Delta([{ retain: 2 }, { retain: 2 }, { delete: 1 }]);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'AB' }]);
  });
});