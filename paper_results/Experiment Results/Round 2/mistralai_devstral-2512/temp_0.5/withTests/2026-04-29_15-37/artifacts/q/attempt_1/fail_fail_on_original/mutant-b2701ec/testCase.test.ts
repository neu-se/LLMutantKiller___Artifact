// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-b2701ec/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor with custom inspect", () => {
    it("should use custom inspect function when provided", () => {
        const customInspect = () => ({ state: "custom" });
        const promise = Q.Promise({}, undefined, customInspect);
        expect(promise.inspect()).toEqual({ state: "custom" });
    });
});