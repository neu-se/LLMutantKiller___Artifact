import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should create a global Q object when executed as a script", () => {
        const originalQ = globalThis.Q;
        delete globalThis.Q;
        const script = document.createElement("script");
        script.src = "q.js";
        document.head.appendChild(script);
        expect(globalThis.Q).toBeDefined();
        globalThis.Q = originalQ;
        document.head.removeChild(script);
    });
});