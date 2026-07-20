const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function behavior with function argument", () => {
  it("should correctly handle function arguments in the stream pipeline", () => {
    const input = [1, 2, 3];
    const expectedOutput = [2, 4, 6];
    let result: number[] = [];

    pull(
      pull.values(input),
      pull.map((x: number) => x * 2),
      pull.collect((err: any, data: number[]) => {
        result = data;
      })
    );

    expect(result).toEqual(expectedOutput);
  });
});