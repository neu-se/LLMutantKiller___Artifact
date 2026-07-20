import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta diff method", () => {
  it("should optimize when comparing identical delta instances", () => {
    const delta = new Delta([{ insert: "test" }]);
    const spy = jest.spyOn(delta, 'slice');
    delta.diff(delta);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});