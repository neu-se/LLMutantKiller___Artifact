import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("promise", () => {
    it("should reject when an exception is thrown in the resolver", () => {
        const resolver = (resolve: any, reject: any, notify: any) => {
            try {
                throw new Error();
            } catch (e) {
                reject(e);
            }
        };
        const promise = Q.promise(resolver);
        return promise.then(null, (reason: any) => {
            expect(reason).toBeInstanceOf(Error);
        });
    });
});