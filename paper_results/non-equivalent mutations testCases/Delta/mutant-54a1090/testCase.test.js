const path = require('node:path');

describe('Delta compose raw op preservation', () => {
  it('preserves separate leading raw insert ops under a plain retain', () => {
    const modulePath = process.env.DELTA_PATH
      ? path.resolve(process.env.DELTA_PATH)
      : path.resolve(
          __dirname,
          '../../subject_repositories/delta/dist/Delta.js',
        );

    delete require.cache[require.resolve(modulePath)];
    const DeltaModule = require(modulePath);
    const Delta = DeltaModule.default;

    const left = new Delta([{ insert: 'A' }, { insert: 'B' }]);
    const right = new Delta([{ retain: 2 }]);

    const result = left.compose(right);

    expect(result.ops).toEqual([{ insert: 'A' }, { insert: 'B' }]);
  });
});
