const path = require('node:path');

describe('Delta transform empty retain object', () => {
  it('preserves an empty retain object instead of treating it as an embed', () => {
    const modulePath = process.env.DELTA_PATH
      ? path.resolve(process.env.DELTA_PATH)
      : path.resolve(
          __dirname,
          '../../subject_repositories/delta/dist/Delta.js',
        );

    delete require.cache[require.resolve(modulePath)];
    const DeltaModule = require(modulePath);
    const Delta = DeltaModule.default;

    const left = new Delta().retain(1);
    const right = new Delta().retain({});

    expect(() => left.transform(right, false)).not.toThrow();
    expect(left.transform(right, false).ops).toEqual([{ retain: {} }]);
  });
});
