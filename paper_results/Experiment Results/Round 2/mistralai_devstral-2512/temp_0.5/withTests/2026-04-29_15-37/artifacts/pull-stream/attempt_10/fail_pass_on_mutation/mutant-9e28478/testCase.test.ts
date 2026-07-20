// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-9e28478/testCase.test.ts
const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with two arguments", () => {
  it("should correctly handle partial application with two sinks and verify exact data flow", () => {
    const values = [1, 2, 3];
    let i = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) cb(abort);
      else if (i >= values.length) cb(true);
      else cb(null, values[i++]);
    };

    const sink1 = (read: any) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) cb(end);
          else cb(null, data * 2);
        });
      };
    };

    const sink2 = (read: any) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) cb(end);
          else cb(null, data + 1);
        });
      };
    };

    const partialSink = pull(sink1, sink2);
    const result = partialSink(source);

    const collected: number[] = [];
    let callCount = 0;

    result(null, (end: any, data: any) => {
      callCount++;
      if (end) {
        expect(collected).toEqual([3, 5, 7]);
        expect(callCount).toBe(4);
      } else {
        collected.push(data);
        if (collected.length < 3) {
          result(null, (end: any, data: any) => {
            if (!end) {
              collected.push(data);
              callCount++;
            }
          });
        } else {
          result(true, (end: any) => {
            expect(end).toBe(true);
            expect(collected).toEqual([3, 5, 7]);
            expect(callCount).toBe(4);
          });
        }
      }
    });
  });
});