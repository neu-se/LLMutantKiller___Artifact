import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation detection", () => {
  it("handles string rejection in a then chain with longStackSupport enabled", async () => {
    Q.longStackSupport = true;

    const result = await Q.fcall((): string => { throw "string error"; })
      .then(null, (err: unknown) => String(err));

    expect(result).toBe("string error");
  });
});