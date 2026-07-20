import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('null retain op should not cause delete to be pushed', () => {
    // Force a null retain into the ops array
    const a = new Delta();
    Object.defineProperty(a, 'ops', {
      value: [{ retain: null }],
      writable: true,
      configurable: true
    });
    const b = new Delta([{ delete: 1 }]);
    const result = a.compose(b);
    expect(result.ops).toEqual([]);
  });
});