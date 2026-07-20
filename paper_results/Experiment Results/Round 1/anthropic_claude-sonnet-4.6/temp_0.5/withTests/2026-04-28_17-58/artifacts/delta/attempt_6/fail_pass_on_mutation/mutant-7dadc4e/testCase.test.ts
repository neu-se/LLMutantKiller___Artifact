import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform with retain null in other does not produce null retain in result', () => {
    const a = new Delta([{ retain: 1 }]);
    const b = new Delta([{ retain: null as any, attributes: { bold: true } }]);
    
    const retainSpy = jest.spyOn(Delta.prototype, 'retain');
    const result = a.transform(b, false);
    retainSpy.mockRestore();
    
    // Check that retain was never called with null
    const nullCalls = retainSpy.mock.calls.filter(call => call[0] === null);
    expect(nullCalls).toHaveLength(0);
  });
});