import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys", () => {
  it("should return own property keys of an object with inherited properties", () => {
    function Klass(this: any, a: any, b: any) {
      this.a = a;
      this.b = b;
    }
    Klass.prototype.notOwn = 1;

    return Q.keys(new (Klass as any)(10, 20)).then((keys: string[]) => {
      expect(keys.sort()).toEqual(["a", "b"]);
    });
  });
});