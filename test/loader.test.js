import compiler from "./compiler";
import { parserPlugin, compilerPlugin, compilerPluginWithError } from "./plugins";
import {condition, isCJS, isESM} from "./utils";


condition(isCJS, () => {

  describe("validate unify setup", () => {
    
    it("should not accept a missing use option", async () => {
      const stats = await compiler("example.txt", {});
      expect(stats.compilation.errors).toHaveLength(1);
      expect(stats.compilation.errors[0].error.message).toBe("Cannot `process` without `Parser`")
    });
    
    it("should handle diffrent options", async () => {
      const stats = await compiler("example.txt", {wrong: []});
      expect(stats.compilation.errors).toHaveLength(1);
      expect(stats.compilation.errors[0].error.message).toBe("Cannot `process` without `Parser`")
    });
    
    it("should propagate missing parser error", async () => {
      const stats = await compiler("example.txt", {use: []});
      expect(stats.compilation.errors).toHaveLength(1);
      expect(stats.compilation.errors[0].error.message).toBe("Cannot `process` without `Parser`")
    });
    
    it("should propagate missing compiler error", async () => {
      const stats = await compiler("example.txt", {use: [parserPlugin]});
      expect(stats.compilation.errors).toHaveLength(1);
      expect(stats.compilation.errors[0].error.message).toBe("Cannot `process` without `Compiler`")
    });
    
    it("should accept a parser and compiler", async () => {
      const stats = await compiler("example.txt", {use: [parserPlugin, compilerPlugin]});
      expect(stats.compilation.errors).toHaveLength(0);
    });
    
    it("should accept an array with [plugin, options]", async () => {
      const stats = await compiler("example.txt", {use: [[parserPlugin, {}], [compilerPlugin, {}]]});
      expect(stats.compilation.errors).toHaveLength(0);
    });
    
    it("should not accept invalid plugins", async () => {
      const stats = await compiler("example.txt", {use: [() => {}]});
      expect(stats.compilation.errors).toHaveLength(1);
      expect(stats.compilation.errors[0].error.message).toBe("Cannot `process` without `Parser`")
    });
    
    it("should not accept invalid plugins and options", async () => {
      const stats = await compiler("example.txt", {use: [[() => {}, {}]]});
      expect(stats.compilation.errors).toHaveLength(1);
      expect(stats.compilation.errors[0].error.message).toBe("Cannot `process` without `Parser`")
    });
  });
});


condition(isCJS, () => {
  
  describe("validate unify processing", () => {
    
    it("should successfully compile", async () => {
      const stats = await compiler("example.txt", {use: [parserPlugin, compilerPlugin]});
      const output = stats.toJson({ source: true }).modules[0].source;
      expect(output).toBe('test-string');
    });
    
    it("should propagate errors during processing", async () => {
      const stats = await compiler("example.txt", {use: [parserPlugin, compilerPluginWithError]});
      expect(stats.compilation.errors).toHaveLength(1);
      expect(stats.compilation.errors[0].error.message).toBe("Whoops!")
    });
  });
});


condition(isESM, () => {
  describe("loader.test.js skipped.", () => {
    it("", () => {})
  });
});
