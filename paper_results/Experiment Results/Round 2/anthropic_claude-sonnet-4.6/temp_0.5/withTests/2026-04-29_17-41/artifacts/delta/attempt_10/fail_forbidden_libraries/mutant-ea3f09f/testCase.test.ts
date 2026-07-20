// eslint-disable-next-line @typescript-eslint/no-var-requires
const Delta = require("quill-delta");
import type Op from "../../src/Op";

describe('transform()', () => {
  it('does not call embed transform handler when this retain is an embed but other retain is a number', () => {
    const transformFn = jest.fn((a: unknown[], b: unknown[], priority: boolean) =>
      new Delta(a).transform(new Delta(b), priority).ops
    );

    Delta.registerEmbed('delta', {
      compose: (a: unknown[], b: unknown[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: transformFn,
      invert: (a: unknown[], b: unknown[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain(1, { bold: true });

      const result = a.transform(b, true);

      expect(transformFn).not.toHaveBeenCalled();
      expect(result).toEqual(new Delta().retain(1, { bold: true }));
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});