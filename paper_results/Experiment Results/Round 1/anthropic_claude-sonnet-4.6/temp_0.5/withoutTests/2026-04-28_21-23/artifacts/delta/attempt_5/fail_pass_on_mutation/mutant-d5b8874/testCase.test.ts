import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('should not push delete for null retain', () => {
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta([{ delete: 1 }]);
    
    const pushSpy = jest.spyOn(Delta.prototype, 'push');
    const result = a.compose(b);
    pushSpy.mockRestore();
    
    const deletePushes = pushSpy.mock.calls.filter(([op]) => typeof (op as any).delete === 'number');
    expect(deletePushes).toHaveLength(0);
  });
});