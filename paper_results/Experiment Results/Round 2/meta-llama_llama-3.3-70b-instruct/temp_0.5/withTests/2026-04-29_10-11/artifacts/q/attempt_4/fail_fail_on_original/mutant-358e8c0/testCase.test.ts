import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q function", () => {
    it("should check if a promise is fulfilled", () => {
        const promise = Q(5);
        expect((promise as any).inspect().state).toBe("fulfilled");
        const rejectedPromise = Q.reject(new Error());
        expect((rejectedPromise as any).inspect().state).toBe("rejected");
    });
});