import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() retain with embed handler', () => {
  it('transform with priority true should call handler and shift ops', () => {
    Delta.registerEmbed<{ val: number }>('img', {
      compose: (a, b, keepNull) => ({ val: a.val + b.val }),
      transform: (a, b, priority) => priority ? { val: b.val + 100 } : b,
      invert: (a, b) => b,
    });

    try {
      const a = new Delta().retain({ img: { val: 1 } });
      const b = new Delta().retain({ img: { val: 2 } });

      const result = a.transform(b, true);
      // Original: handler.transform called, transformedData = { img: { val: 102 } }
      // Mutated: handler never fetched, transformedData stays as { img: { val: 2 } }
      const expected = new Delta().retain({ img: { val: 102 } });
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('img');
    }
  });
});