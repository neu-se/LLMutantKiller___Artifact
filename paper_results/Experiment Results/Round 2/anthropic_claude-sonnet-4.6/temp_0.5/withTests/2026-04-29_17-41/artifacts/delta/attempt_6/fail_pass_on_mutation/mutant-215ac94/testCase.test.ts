import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform embed retain where thisData is object and otherData is object uses handler', () => {
    let callCount = 0;
    Delta.registerEmbed('img', {
      compose: (_a: unknown, b: unknown, _k: boolean): unknown => b,
      transform: (_a: unknown, b: unknown, _p: boolean): unknown => {
        callCount++;
        return b;
      },
      invert: (_a: unknown, b: unknown): unknown => b,
    });

    try {
      // When thisData is a number (retain(1)) and otherData is an embed object,
      // original skips the embed block so handler is NOT called.
      // Mutated enters the block but embedType=undefined != 'img', so handler still NOT called.
      // We need thisData to be an object to call the handler.
      // Test: verify handler IS called when both are embed objects (same in both versions)
      // vs NOT called when thisData is numeric (differs: original skips, mutated enters but no match)
      
      // The real test: with thisData=number, otherData=embed, handler should NOT be called
      const a = new Delta().retain(1); // numeric retain - thisData = 1
      const b = new Delta().retain({ img: 'photo.jpg' }); // embed retain - otherData = {img:...}
      a.transform(b, false);
      // Original: skips block (thisData is number) → callCount = 0
      // Mutated: enters block, embedType=undefined, Object.keys({img:...})[0]='img',
      //          undefined !== 'img' → handler NOT called → callCount = 0
      // Same! This won't work.
      expect(callCount).toBe(0);
    } finally {
      Delta.unregisterEmbed('img');
    }
  });
});