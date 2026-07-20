import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('uses Array.push when appending new op at end of ops array', () => {
    const delta = new Delta([{ insert: 'hello' }]);
    const pushSpy = jest.spyOn(delta.ops, 'push');
    const spliceSpy = jest.spyOn(delta.ops, 'splice');
    
    // Push a retain - won't merge with insert, will append at end
    delta.retain(5);
    
    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(spliceSpy).not.toHaveBeenCalled();
  });
});