import { infinite } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js";

describe("infinite source - abort behavior", () => {
  it("should call cb with the end value when end is truthy (abort signal)", (done) => {
    const source = infinite(() => 42);
    const err = new Error("abort");

    source(err, (endValue: any) => {
      expect(endValue).toBe(err);
      done();
    });
  });
});