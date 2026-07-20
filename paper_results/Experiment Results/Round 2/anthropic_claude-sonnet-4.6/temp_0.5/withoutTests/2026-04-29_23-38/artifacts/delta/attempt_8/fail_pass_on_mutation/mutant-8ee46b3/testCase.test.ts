import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('detects mutation by checking embed handler is not called when otherData is a number', () => {
    let handlerCalled = false;
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        handlerCalled = true;
        return b;
      },
    });
    
    const a = new Delta().retain({ image: 'url' });
    const b = new Delta().retain(1);
    a.transform(b, false);
    
    Delta.unregisterEmbed('image');
    
    expect(handlerCalled).toBe(false);
  });
});