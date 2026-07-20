import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("promise", () => {
    it("should resolve with the correct value", () => {
        const resolver = (resolve: any, reject: any, notify: any) => {
            resolve("test");
        };
        const promise = Q.promise(resolver);
        return promise.then((value: any) => {
            expect(value).toBe("test");
        });
    });

    it("should reject with the correct reason", () => {
        const resolver = (resolve: any, reject: any, notify: any) => {
            reject("test");
        };
        const promise = Q.promise(resolver);
        return promise.then(null, (reason: any) => {
            expect(reason).toBe("test");
        });
    });

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