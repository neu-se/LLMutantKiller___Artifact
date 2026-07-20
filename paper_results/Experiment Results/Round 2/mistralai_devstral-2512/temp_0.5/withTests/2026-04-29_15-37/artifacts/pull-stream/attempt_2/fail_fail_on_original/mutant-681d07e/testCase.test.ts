// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-681d07e/testCase.test.ts
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull stream partial sink behavior', () => {
  it('should throw TypeError when partial sink is called twice', () => {
    const partialSink = pull((read: any) => {
      return (end: any, cb: any) => {
        if (end) return cb(end);
        read(null, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data);
        });
      };
    });

    const source = pull.values([1, 2, 3]);
    const sink = partialSink(source);

    const firstCall = jest.fn();
    const secondCall = jest.fn();

    sink(null, firstCall);
    expect(() => sink(null, secondCall)).toThrow(TypeError);
  });
});