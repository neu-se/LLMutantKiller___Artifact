import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('insert followed by embed retain composed with delete and delete', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    
    // this: insert 'hello', then retain embed
    const a = new Delta().insert('hello').retain({ image: 'url' });
    // other: delete 5 (hello), then delete 1 (embed)
    const b = new Delta().delete(5).delete(1);
    const result = a.compose(b);
    
    Delta.unregisterEmbed('image');
    
    // insert + delete cancels, embed retain + delete = delete
    expect(result.ops).toEqual([{ delete: 1 }]);
  });
});