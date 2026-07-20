import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initialization", () => {
  it("stackCounter should increment for each deferred when longStackSupport is enabled", () => {
    Q.longStackSupport = true;
    
    const d1 = Q.defer();
    const d2 = Q.defer();
    
    const counter1 = (d1.promise as any).stackCounter;
    const counter2 = (d2.promise as any).stackCounter;
    
    Q.longStackSupport = false;
    
    expect(typeof counter1).toBe("number");
    expect(typeof counter2).toBe("number");
    expect(counter2).toBe(counter1 + 1);
  });
});