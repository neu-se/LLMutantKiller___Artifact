// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-ab94fe2/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method error handling", () => {
    it("should call Q.onerror when promise is rejected and no errback is provided", (done) => {
        const error = new Error("test error");
        let onerrorCalled = false;

        Q.onerror = (err) => {
            onerrorCalled = true;
            expect(err).toBe(error);
            done();
        };

        Q.reject(error).done();
    });
});