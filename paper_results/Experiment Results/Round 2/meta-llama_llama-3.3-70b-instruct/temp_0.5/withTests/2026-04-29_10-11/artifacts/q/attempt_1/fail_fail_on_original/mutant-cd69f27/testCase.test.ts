import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("SES enviroment", () => {
    it("should throw an error when ses is not ok", () => {
        // Create a mock ses object
        const ses = {
            ok: () => false,
        };

        // Use the global object to access the Q function
        const globalAny: any = globalThis;
        expect(() => {
            globalAny.ses = ses;
            Q();
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });
});