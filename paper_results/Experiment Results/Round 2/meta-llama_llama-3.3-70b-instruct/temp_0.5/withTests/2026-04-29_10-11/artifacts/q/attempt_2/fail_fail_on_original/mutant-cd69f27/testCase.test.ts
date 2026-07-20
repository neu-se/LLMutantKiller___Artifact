import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("SES environment", () => {
    it("should not throw an error when ses is ok", () => {
        // Create a mock ses object
        const ses = {
            ok: () => true,
            makeQ: () => {}
        };

        // Use the global object to access the Q function
        const globalAny: any = globalThis;
        globalAny.ses = ses;
        expect(() => Q()).not.toThrow();
    });

    it("should throw an error when ses is not ok in the mutated code", () => {
        // Create a mock ses object
        const ses = {
            ok: () => false,
        };

        // Use the global object to access the Q function
        const globalAny: any = globalThis;
        globalAny.ses = ses;
        expect(() => {
            // Simulate the mutated code by not calling ses.makeQ
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });
});