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

        // Call Q
        const Q = require('../../../../q');

        expect(() => {
            Q();
        }).not.toThrow();
    });
});