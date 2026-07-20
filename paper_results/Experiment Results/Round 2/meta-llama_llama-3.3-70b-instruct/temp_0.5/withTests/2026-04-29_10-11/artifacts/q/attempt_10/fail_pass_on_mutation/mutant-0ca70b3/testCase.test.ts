describe("Q", () => {
    it("should filter stack traces correctly", () => {
        const lines = [
            "at Object.<anonymous> (/path/to/file.js:1:1)",
            "at Module._compile (internal/modules/cjs/loader.js:1:1)",
            "at Object.Module._extensions..js (internal/modules/cjs/loader.js:1:1)",
            "at Module.load (internal/modules/cjs/loader.js:1:1)",
            "at Function.Module._load (internal/modules/cjs/loader.js:1:1)",
            "at Function.Module.runMain (internal/modules/cjs/loader.js:1:1)",
            "at internal/main/run_main_module.js:1:1"
        ];

        let i = 0;
        for (i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.includes("at Object.<anonymous>") || line.includes("at Module._compile")) {
                break;
            }
        }

        expect(i).toBe(0);
    });
});