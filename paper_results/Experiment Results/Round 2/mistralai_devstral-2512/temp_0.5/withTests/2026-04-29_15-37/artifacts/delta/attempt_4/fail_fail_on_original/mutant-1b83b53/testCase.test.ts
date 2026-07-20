import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        // This handler will behave differently based on keepNull parameter
        if (keepNull === true) {
          return [{ insert: 'keepNull-true' }];
        } else if (keepNull === false) {
          return [{ insert: 'keepNull-false' }];
        } else {
          return [{ insert: 'keepNull-undefined' }];
        }
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should pass correct keepNull parameter when composing embed retains', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.compose(b);
    // Original code should pass keepNull=true for retain actions
    // Mutated code passes keepNull=false (action === "")
    expect(result.ops).toEqual([{ insert: 'keepNull-true' }]);
  });
});