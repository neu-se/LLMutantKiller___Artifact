import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get", () => {
  it("should return a promise for the property value", (done) => {
    const obj = { foo: "bar" };
    Q.get(obj, "foo").then((value: unknown) => {
      expect(value).toBe("bar");
      done();
    }).catch((err: unknown) => {
      done(err as Error);
    });
  });
});