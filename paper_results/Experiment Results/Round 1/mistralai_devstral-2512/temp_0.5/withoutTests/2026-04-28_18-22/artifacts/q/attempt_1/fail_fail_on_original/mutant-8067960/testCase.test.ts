import { Q } from "./q";

describe("Q.get", () => {
  it("should return a promise for the property value", (done) => {
    const obj = { foo: "bar" };
    Q.get(obj, "foo").then((value) => {
      expect(value).toBe("bar");
      done();
    }).catch((err) => {
      done(err);
    });
  });
});