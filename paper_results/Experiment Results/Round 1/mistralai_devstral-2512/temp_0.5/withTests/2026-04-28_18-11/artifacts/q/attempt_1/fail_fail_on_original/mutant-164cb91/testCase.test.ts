// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-164cb91/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should emit unhandledRejection event when process.emit is a function", (done) => {
        // Simulate a Node.js environment with process.emit
        const originalProcess = global.process;
        global.process = {
            emit: (event: string, ...args: any[]) => {
                if (event === "unhandledRejection") {
                    expect(args[0]).toBe("test rejection");
                    expect(Q.isPromise(args[1])).toBe(true);
                    done();
                }
            },
            nextTick: (callback: Function) => {
                callback();
            }
        } as any;

        // Create and reject a promise without handling it
        Q.reject("test rejection");

        // Restore original process
        global.process = originalProcess;
    });
});