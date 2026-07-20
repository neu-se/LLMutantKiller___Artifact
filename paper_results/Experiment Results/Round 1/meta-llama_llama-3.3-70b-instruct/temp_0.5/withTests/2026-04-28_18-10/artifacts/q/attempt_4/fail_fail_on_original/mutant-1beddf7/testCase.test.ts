import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("promise", () => {
    it("should handle exceptions in the resolver", () => {
        const resolver = (resolve: any, reject: any, notify: any) => {
            throw new Error("test");
        };
        const promise = Q.promise(resolver);
        return promise.then(null, (reason: any) => {
            expect(reason.message).toBe("test");
        });
    });
});