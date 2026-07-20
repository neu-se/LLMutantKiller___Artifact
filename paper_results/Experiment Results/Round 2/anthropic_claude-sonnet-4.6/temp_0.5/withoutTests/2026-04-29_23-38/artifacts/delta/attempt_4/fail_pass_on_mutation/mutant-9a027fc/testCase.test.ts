import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transform where this has object retain and other has object retain of different type', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    Delta.registerEmbed('video', {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });

    const a = new Delta().retain({ image: { src: 'x' } });
    const b = new Delta().retain({ video: { id: 1 } });
    
    // thisData = {image:{src:'x'}}, otherData = {video:{id:1}}
    // Both are objects. transformedData = otherData (both agree)
    // Handler block: embedType = 'image', Object.keys(otherData)[0] = 'video'
    // 'image' !== 'video' → handler NOT called
    // transformedData = {video:{id:1}}
    // delta.retain({video:{id:1}}) → [{retain:{video:{id:1}}}]
    
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: { video: { id: 1 } } }]);
    
    Delta.unregisterEmbed('image');
    Delta.unregisterEmbed('video');
  });
});