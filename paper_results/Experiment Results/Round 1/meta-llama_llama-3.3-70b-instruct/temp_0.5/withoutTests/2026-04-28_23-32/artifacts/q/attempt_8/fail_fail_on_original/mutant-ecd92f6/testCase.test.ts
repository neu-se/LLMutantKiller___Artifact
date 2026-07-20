import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should return a promise with a state of "unknown" when inspect is not provided and fallback is called', () => {
        const promise = Q.Promise({}, (op: string, args: any[]) => {
            if (op === "when") {
                return Q.resolve("test");
            } else {
                return {};
            }
        }, () => ({ state: "unknown" }));
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});