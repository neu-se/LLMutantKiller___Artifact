import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('should not push delete when null retain composes with delete', () => {
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta([{ delete: 1 }]);
    
    const pushSpy = jest.spyOn(Delta.prototype, 'push');
    const result = a.compose(b);
    pushSpy.mockRestore();
    
    const deletePushCalls = pushSpy.mock.calls.filter(
      ([op]) => op && typeof (op as any).delete === 'number'
    );
    
    expect(deletePushCalls.length).toBe(0);
    expect(result.ops).toEqual([]);
  });
});