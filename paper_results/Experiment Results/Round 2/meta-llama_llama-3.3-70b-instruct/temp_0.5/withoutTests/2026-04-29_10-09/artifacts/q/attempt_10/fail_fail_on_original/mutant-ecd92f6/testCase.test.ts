import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise with state "unknown" when inspect is undefined', () => {
        const promise = Q.Promise({}, (op: string, args: any[]) => {
            return {};
        }, (inspect: any) => {
            if (inspect === undefined) {
                return { state: "unknown" };
            }
        });
        expect(promise.inspect().state).toBe("unknown");
    });
});