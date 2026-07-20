describe("SES environment", () => {
    it("should set ses.makeQ when ses is ok", () => {
        const ses = {
            ok: () => true,
            makeQ: () => {}
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

        originalQ(ses, {});
        expect(ses.makeQ).toBeDefined();

        ses.makeQ = undefined;
        mutatedQ(ses, {});
        expect(ses.makeQ).toBeUndefined();
    });
});