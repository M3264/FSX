const { readFile } = require("fs/promises");
const path = require("path");

class Resolver {
  constructor(pageKey) {
    this.assetsBase = path.resolve("./dist/client/");
    this.manifestPath = path.resolve(this.assetsBase, ".vite/manifest.json");
    this.pageKey = pageKey;
  }

  async _readManifest() {
    try {
      const content = await readFile(this.manifestPath, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      console.error("Error reading manifest:", error);
      return null;
    }
  }

  async getBundle() {
    const manifest = await this._readManifest();
    if (!manifest) return null;

    const result = manifest["../main.tsx"];
    if (result && result.file) {
      // Return absolute path to JS bundle
      return path.resolve(this.assetsBase, result.file);
    }
    return null;
  }

  async getCSS() {
    const manifest = await this._readManifest();
    if (!manifest) return null;

    const result = manifest["../main.tsx"];
    if (result && result.css && result.css.length > 0) {
      // Return absolute path to CSS file
      return path.resolve(this.assetsBase, result.css[0]);
    }
    return null;
  }

  async getChunksPerPage() {
    const manifest = await this._readManifest();
    let jsFiles = new Set();
    const pageKey = this.pageKey;
    if (!pageKey) {
      throw new Error("PageKey is required.");
    }

    if (!manifest) {
      throw new Error("Manifest doesn't exist");
    }
    if (manifest[pageKey]) {
      const pageFile = manifest[pageKey].file;
      console.log(`[RENDERER] Found ${pageFile} for the query ${pageKey}`);
      jsFiles.add(manifest[pageKey].file);
    }
    if (
      manifest["../entry-client.tsx"] &&
      manifest["../entry-client.tsx"].file
    ) {
      jsFiles.add(manifest["../entry-client.tsx"].file),
        jsFiles.add(...manifest["../entry-client.tsx"].imports);
    }
    if (manifest[pageKey].imports) {
      jsFiles = new Set([...jsFiles, ...manifest[pageKey].imports]);
    }
    return jsFiles;
  }
}

module.exports = Resolver;
