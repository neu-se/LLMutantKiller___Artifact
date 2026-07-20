import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with a fulfilled state when inspect is undefined', () => {
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