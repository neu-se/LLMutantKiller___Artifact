import { filter } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("filter mutation test", () => {
  it("should correctly filter values and handle sync/async behavior", (done) => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expectedFiltered = [2, 4, 6, 8, 10];
    let result: number[] = [];

    pull(
      pull.values(input),
      filter((d: number) => d % 2 === 0),
      pull.collect((err: any, collected: number[]) => {
        result = collected;
        expect(result).toEqual(expectedFiltered);
        done();
      })
    );
  });
});