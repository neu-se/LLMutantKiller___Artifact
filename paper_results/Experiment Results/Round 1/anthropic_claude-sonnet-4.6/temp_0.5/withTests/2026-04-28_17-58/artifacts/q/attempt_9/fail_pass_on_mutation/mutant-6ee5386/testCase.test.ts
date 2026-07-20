import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q finally static with throwing callback", () => {
  it("should reject with callback error when finally callback throws on fulfilled promise", () => {
    const callbackError = new Error("callback threw");
    
    return (Q as any)["finally"](Q("value"), function() {
      throw callbackError;  
    }).then(
      function() {
        throw new Error("should not fulfill");
      },
      function(err: any) {
        expect(err).toBe(callbackError);
      }
    );
  });
});