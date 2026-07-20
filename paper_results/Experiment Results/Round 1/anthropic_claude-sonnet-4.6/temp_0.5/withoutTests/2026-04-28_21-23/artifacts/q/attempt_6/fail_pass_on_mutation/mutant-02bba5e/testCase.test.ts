import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q done with null rejection", () => {
  it("onerror should receive null when done is called on null-rejected promise", (done) => {
    const originalOnerror = Q.onerror;
    const errors: any[] = [];
    
    Q.onerror = (err: any) => {
      errors.push(err);
    };
    
    Q.reject(null).done();
    
    setTimeout(() => {
      Q.onerror = originalOnerror;
      try {
        expect(errors).toHaveLength(1);
        expect(errors[0]).toBeNull();
        done();
      } catch (e) {
        done(e);
      }
    }, 100);
  });
});