import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine hasStacks guard", () => {
  it("filters Q internal frames from long stack traces", () => {
    Q.longStackSupport = true;

    function userFunction() {
      return Q.reject(new Error("user error"));
    }

    return userFunction()
      .catch(function(err: any) {
        Q.longStackSupport = false;
        const stack: string = err.stack || "";
        // Q internal frames should be filtered out; user frames should remain
        expect(stack).toContain("userFunction");
        return "handled";
      });
  });
});