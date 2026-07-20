import { Delta } from "../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('composes correctly when first other is null', () => {
    const delta1 = new Delta([{ retain: 1, attributes: {} }, { insert: 'a' }]);
    const delta2 = new Delta([null, { insert: 'b' }]);
    expect(() => delta1.compose(delta2)).toThrowError('no handlers for embed type "undefined"');
  });
});