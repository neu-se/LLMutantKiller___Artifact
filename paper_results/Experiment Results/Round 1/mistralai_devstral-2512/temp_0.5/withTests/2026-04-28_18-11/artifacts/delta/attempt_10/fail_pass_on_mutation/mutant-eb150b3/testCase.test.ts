import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        if (keepNull) {
          return new Delta(a).compose(new Delta(b)).ops;
        } else {
          return new Delta(a).compose(new Delta(b)).ops;
        }
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('retain an embed with a number', () => {
    const a = new Delta().insert({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().insert(
      { delta: [{ insert: 'a' }] },
      { bold: true },
    );
    expect(a.compose(b)).toEqual(expected);
  });
});