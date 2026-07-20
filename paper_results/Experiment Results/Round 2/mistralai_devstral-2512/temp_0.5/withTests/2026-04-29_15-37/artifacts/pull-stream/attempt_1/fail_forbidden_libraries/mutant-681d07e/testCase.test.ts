// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-681d07e/testCase.test.ts
import { test } from 'tape';
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

test('partial sink should throw when called twice', (t) => {
  t.plan(1);
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

  sink(null, (end: any, data: any) => {
    t.equal(data, 1, 'first call should succeed');
    t.throws(() => {
      sink(null, (end: any, data: any) => {});
    }, TypeError, 'second call should throw TypeError');
  });
});