import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import domain from "domain";

describe("Q domain tracking", () => {
  it("does not track domain on tasks when isNodeJS is false", (done) => {
    const d = domain.create();
    const domainExits: number[] = [];
    const origExit = d.exit.bind(d);
    d.exit = () => { domainExits.push(1); origExit(); };
    
    d.run(() => {
      Q.nextTick(() => {
        // Task runs here
        setTimeout(() => {
          // With isNodeJS=false: domain not tracked, exit not called by runSingle
          // With isNodeJS=true: domain tracked, exit called by runSingle  
          expect(domainExits.length).toBe(0);
          done();
        }, 10);
      });
    });
  });
});