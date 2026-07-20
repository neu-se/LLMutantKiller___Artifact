import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("SES environment", () => {
    it("should set ses.makeQ when ses is ok", () => {
        // Create a mock ses object
        const ses = {
            ok: () => true,
            makeQ: jest.fn()
        };

        // Use the global object to access the Q function
        const globalAny: any = globalThis;
        globalAny.ses = ses;

        // Call Q
        Q();

        expect(ses.makeQ).toHaveBeenCalledTimes(1);
        expect(ses.makeQ).toHaveBeenCalledWith(expect.any(Function));
    });
});