import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle promise rejection', async () => {
        const error = new Error();
        const p = Q.reject(error);
        try {
            await p;
            throw new Error("Promise was not rejected");
        } catch (e: any) {
            if (e instanceof Error && e.message === "Promise was not rejected") {
                throw e;
            }
            expect(e).toBe(error);
        }
    });
});