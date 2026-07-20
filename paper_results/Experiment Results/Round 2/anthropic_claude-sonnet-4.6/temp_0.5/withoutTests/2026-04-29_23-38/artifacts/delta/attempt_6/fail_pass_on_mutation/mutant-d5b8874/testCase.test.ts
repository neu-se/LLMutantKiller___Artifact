import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('compose embed retain with delete produces delete', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    
    const a = new Delta([{ retain: { image: 'url' } }]);
    const b = new Delta([{ delete: 1 }]);
    const result = a.compose(b);
    
    Delta.unregisterEmbed('image');
    
    expect(result.ops).toEqual([{ delete: 1 }]);
  });
});