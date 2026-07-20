import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform embed retain against number retain uses length not embed handler', () => {
    let handlerCallCount = 0;
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) => {
        handlerCallCount++;
        return new Delta(a).transform(new Delta(b), priority).ops;
      },
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisData = {delta:[{insert:'a'}]} (object), otherData = 3 (number)
      // transformedData initialized to: typeof 3 === 'object' ? 3 : length = length = 1
      // Original: typeof obj === 'object' && true && typeof 3 === 'object' = false -> skip
      //   transformedData = 1, delta.retain(1) -> chopped away
      // Mutated: (typeof obj === 'object' && true) || ... = true -> enters block
      //   embedType = 'delta', Object.keys(3)[0] = undefined, 'delta' !== undefined -> no handler
      //   transformedData stays 1, delta.retain(1) -> chopped away
      // Both give same result... 
      
      // Try: a has TWO ops: embed retain + something, b has matching number retain
      // So the retain(1) doesn't get chopped
      const a = new Delta([
        { retain: { delta: [{ insert: 'a' }] } },
        { insert: 'x' },
      ]);
      const b = new Delta([
        { retain: { delta: [{ insert: 'b' }] } },
        { retain: 1 },
      ]);
      // thisData = {delta:[{insert:'a'}]}, otherData = {delta:[{insert:'b'}]}
      // Both objects, same type -> handler called in BOTH original and mutated
      // handler.transform([{insert:'a'}], [{insert:'b'}], false)
      // = new Delta([{insert:'a'}]).transform(new Delta([{insert:'b'}]), false)
      // = [{insert:'b'}] (no priority)
      const result = a.transform(b, false);
      expect(handlerCallCount).toBe(1);
      expect(result).toEqual(
        new Delta([
          { retain: { delta: [{ insert: 'b' }] } },
          { retain: 1 },
        ])
      );
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});