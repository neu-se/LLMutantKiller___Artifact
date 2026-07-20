import { describe, it, expect, jest } from "@jest/globals";

describe("Q isNodeJS initial value affects domain tracking", () => {
  it("does not track domain when isNodeJS starts as false and process check fails", (done) => {
    const origToString = Object.getOwnPropertyDescriptor(process, "toString");
    (process as any).toString = () => "[object Object]";
    
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    if (origToString) {
      Object.defineProperty(process, "toString", origToString);
    } else {
      delete (process as any).toString;
    }
    
    const domain = require("domain");
    const d = domain.create();
    let domainExitCount = 0;
    const origExit = d.exit.bind(d);
    d.exit = () => { domainExitCount++; origExit(); };
    
    d.run(() => {
      Q(1).then((val: number) => {
        expect(domainExitCount).toBe(0);
        done();
      });
    });
  });
});