import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should augment error stack traces with the promise chain when longStackSupport is enabled", async () => {
        Q.longStackSupport = true;

        try {
            function level1(): Promise<any> {
                return Q().then(() => level2());
            }

            function level2(): Promise<any> {
                return Q().then(() => {
                    throw new Error("test error from level2");
                });
            }

            await level1().catch((err: any) => {
                // With the original code, makeStackTraceLong concatenates stack frames
                // from the promise chain, so the stack should contain "From previous event:"
                // which is the STACK_JUMP_SEPARATOR used when joining stacks.
                expect(err.stack).toMatch(/From previous event:/);
                throw err; // re-throw to signal we checked it
            });
        } catch (e: any) {
            if (e.message !== "test error from level2") {
                throw e;
            }
        } finally {
            Q.longStackSupport = false;
        }
    });
});