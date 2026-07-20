import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import domain from "domain";

describe("Q domain handling", () => {
  it("should track domain on queued tasks when isNodeJS is true", (done) => {
    const d = domain.create();
    const results: string[] = [];
    
    d.run(() => {
      Q(1).then((val) => {
        results.push(process.domain === d ? "in-domain" : "no-domain");
        expect(results[0]).toBe("in-domain");
        done();
      });
    });
  });
});