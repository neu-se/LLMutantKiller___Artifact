import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.master inspect behavior", () => {
  it("should return a promise that resolves to the object's inspection when master is called", async () => {
    const testObject = { value: 42 };
    const masterPromise = Q.master(testObject);
    const inspection = await masterPromise.inspect();
    expect(inspection).toEqual({ state: "fulfilled", value: testObject });
  });
});