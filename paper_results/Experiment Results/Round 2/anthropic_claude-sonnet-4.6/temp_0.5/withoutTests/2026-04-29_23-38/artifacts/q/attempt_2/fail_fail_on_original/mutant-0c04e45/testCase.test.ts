import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey path", () => {
    it("should invoke generator verb with arg and resolve correctly", async () => {
        const StopIteration = { message: "StopIteration" };
        (global as any).StopIteration = StopIteration;

        try {
            let callCount = 0;
            const mockGeneratorFactory = function() {
                return {
                    next: function(arg: any) {
                        callCount++;
                        if (callCount === 1) {
                            // First call: throw StopIteration to end
                            const e = new (Q as any).QReturnValue ? undefined : undefined;
                            const err: any = Object.create(StopIteration);
                            err.value = 99;
                            throw err;
                        }
                    }
                };
            };

            const asyncFn = Q.async(mockGeneratorFactory);
            const result = await asyncFn();
            expect(result).toBe(99);
        } finally {
            delete (global as any).StopIteration;
        }
    });
});