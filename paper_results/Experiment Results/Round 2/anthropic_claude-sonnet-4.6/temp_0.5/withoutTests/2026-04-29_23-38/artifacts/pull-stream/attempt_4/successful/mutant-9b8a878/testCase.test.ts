import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("Array constructor should be called with length for pre-allocation", () => {
    const OriginalArray = Array;
    let capturedArgs: any[] | undefined;

    const MockArray = jest.fn(function (this: any, ...args: any[]) {
      if (capturedArgs === undefined && args.length <= 1) {
        capturedArgs = args;
      }
      if (args.length === 1 && typeof args[0] === 'number') {
        const arr = new OriginalArray(args[0]);
        Object.setPrototypeOf(arr, OriginalArray.prototype);
        return arr;
      }
      const arr = new OriginalArray();
      Object.setPrototypeOf(arr, OriginalArray.prototype);
      return arr;
    }) as any;
    MockArray.prototype = OriginalArray.prototype;
    MockArray.isArray = OriginalArray.isArray;
    MockArray.from = OriginalArray.from;
    MockArray.of = OriginalArray.of;

    (global as any).Array = MockArray;

    try {
      function through(read: Function) {
        return function(end: any, cb: Function) {
          read(end, cb);
        };
      }

      pull(through, through);

      // Original: new Array(2) → capturedArgs = [2]
      // Mutated: new Array() → capturedArgs = []
      expect(capturedArgs).toEqual([2]);
    } finally {
      (global as any).Array = OriginalArray;
    }
  });
});