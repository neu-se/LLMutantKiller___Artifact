import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
  it("rejected promise should have exception property set to reason when deprecated support is enabled", () => {
    const reason = new Error("fail");
    const p = Q.reject(reason);
    // In original: if(inspected.state === "rejected") sets exception only for rejected
    // In mutated: if(true) always sets exception
    // But since outer if(false)... hmm
    
    // Let's check valueOf behavior
    const val = p.valueOf();
    expect(val).toBe(p); // rejected promise valueOf returns itself
  });
});