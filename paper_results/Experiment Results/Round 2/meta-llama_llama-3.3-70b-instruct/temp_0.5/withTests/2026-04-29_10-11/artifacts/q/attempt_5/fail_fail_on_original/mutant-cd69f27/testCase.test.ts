describe("SES environment", () => {
    it("should throw an error when ses is not ok and makeQ is not set in the mutated code", () => {
        // Create a mock ses object
        const ses = {
            ok: () => false,
        };

        // Use the global object to access the Q function
        const globalAny: any = globalThis;
        globalAny.ses = ses;

        // Call Q
        const Q = require('../../../../q');

        expect(() => {
            Q();
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });
});