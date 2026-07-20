describe("SES environment", () => {
    it("should throw an error when ses.makeQ is not set in the mutated code", () => {
        const ses = {
            ok: () => false,
        };

        const globalAny: any = globalThis;
        globalAny.ses = ses;

        const originalCode = `
            if (!ses.ok()) {
                return;
            } else {
                ses.makeQ = definition;
            }
        `;

        const mutatedCode = `
            if (!ses.ok()) {} else {
                // ses.makeQ = definition;
            }
        `;

        const originalQ = new Function('ses', 'definition', originalCode);
        const mutatedQ = new Function('ses', 'definition', mutatedCode);

        expect(() => {
            mutatedQ(ses, {});
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });
});