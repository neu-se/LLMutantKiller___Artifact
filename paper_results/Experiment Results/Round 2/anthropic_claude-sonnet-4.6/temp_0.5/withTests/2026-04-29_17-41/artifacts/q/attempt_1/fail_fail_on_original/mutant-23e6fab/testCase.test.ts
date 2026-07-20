import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber with standard V8 stack traces", () => {
  it("should not throw when processing V8-style stack frames with long stack support enabled", async () => {
    Q.longStackSupport = true;

    try {
      const result = await Q.promise((resolve: (v: any) => void, reject: (e: any) => void) => {
        Q.nextTick(() => {
          reject(new Error("test rejection"));
        });
      }).then(() => {
        return Q.promise((resolve: (v: any) => void, reject: (e: any) => void) => {
          Q.nextTick(() => {
            reject(new Error("chained rejection"));
          });
        });
      }).fail((err: Error) => {
        // If the mutation is present, accessing attempt3[1] when attempt3 is null
        // would have thrown a TypeError during makeStackTraceLong/filterStackString
        // We just verify the error is the expected one and no crash occurred
        expect(err.message).toBe("chained rejection");
        return "recovered";
      });

      expect(result).toBe("recovered");
    } finally {
      Q.longStackSupport = false;
    }
  });
});