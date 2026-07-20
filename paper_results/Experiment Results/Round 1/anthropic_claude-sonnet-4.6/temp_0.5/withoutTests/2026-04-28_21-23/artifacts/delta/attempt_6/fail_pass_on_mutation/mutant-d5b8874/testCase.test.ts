import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('should not call push with delete when composing null retain', () => {
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta([{ delete: 1 }]);
    
    const pushSpy = jest.spyOn(Delta.prototype, 'push');
    a.compose(b);
    pushSpy.mockRestore();
    
    const deleteCallArgs = pushSpy.mock.calls
      .map(([op]) => op)
      .filter(op => typeof (op as any).delete === 'number');
    
    expect(deleteCallArgs).toHaveLength(0);
  });
});