describe("SES environment", () => {
    it("should set ses.makeQ when ses is ok and throw an error when ses is not ok in the mutated code", () => {
        const ses = {
            ok: () => true,
            makeQ: () => {}
        };

        const globalAny: any = globalThis;
        globalAny.ses = ses;

        const originalCode = `
            if (!ses.ok()) {
                throw new Error("This environment was not anticipated by Q. Please file a bug.");
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
            originalQ(ses, {});
        }).not.toThrow();

        ses.ok = () => false;
        expect(() => {
            mutatedQ(ses, {});
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });
});