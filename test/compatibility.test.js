import compiler from "./compiler";
import { parserPlugin, compilerPlugin } from "./plugins";
import { condition, isESM, isCJS } from "./utils";


condition(isCJS, () => {

  describe("Validate import of CJS unified", () => {
    
    it("should not raise errors", async () => {
      // I don't want to write proper integration tests where we run the test suite with different versions
      // of unified installed, so instead I just mock the import to return a dummy CJS module.
      jest.mock('unified', () => (
        () => {
          return {use: jest.fn(), process: jest.fn()}
        }
      ));
      
      const stats = await compiler("example.txt", {use: [parserPlugin, compilerPlugin]});
      expect(stats.compilation.errors).toHaveLength(0);
    });
  });
});


condition(isCJS, () => {

  describe("Validate import of ESM unified", () => {
    
    it("should not raise errors", async () => {
      // I don't want to write proper integration tests where we run the test suite with different versions
      // of unified installed, so instead I just mock the import to return a dummy ESM module.
      jest.mock('unified', () => ({
        __esModule: true,
        unified: () => {
          return {use: jest.fn(), process: jest.fn()}
        }
      }));
      
      const stats = await compiler("example.txt", {use: [parserPlugin, compilerPlugin]});
      expect(stats.compilation.errors).toHaveLength(0);
    });
  });
});


condition(isCJS, () => {

  describe("Validate CJS export of unified-load", () => {
    
    it("should not raise errors", async () => {
      const loader = require('../src/index.cjs')
      expect(loader).toEqual(expect.any(Function))
    });
  });
});


condition(isESM, () => {
  
  describe("Validate ESM export of unified-loader", () => {
    
    it("should not raise errors", async () => {
      // This only tests dynamic imports. It doesn't look like there is a way to test the
      // import statement, since it needs to to be at the top level of a module.
      const loader = await import('../src/index.mjs')
      expect(loader).toMatchObject({default: expect.any(Function)})
    })
  });
});
