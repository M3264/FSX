const { readFile } = require("fs/promises");
const path = require("path");
const { parser } = require("vite-manifest-parser")

class Resolver {
  constructor() {
    this.assetsBase = path.resolve("./dist/client/");
    this.manifestPath = path.resolve(this.assetsBase, ".vite/manifest.json");
    
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
      // Return manifest file path (e.g., This could be a main-xxx file)
      return result.file;
    }
    return null;
  }

  async getCSS() {
    const manifest = await this._readManifest();
    if (!manifest) return null;

    const result = manifest["../entry-client.tsx"];
    if (result && result.css && result.css[0]) {
      return result.css[0];
    } 
    return null;
  }

  async getChunksPerPage(pageKey) {
    const manifest = await this._readManifest();
    // if you want to debug this functiom, try logging it to see if u get the correct pageKey as it's used in the func, if it's not the problem try logging next steps or look for any error 
    let jsFiles = new Set();

    if (!manifest) {
      throw new Error("Manifest doesn't exist");
    }
    // Add the page's own file
    if (manifest[pageKey] && manifest[pageKey].file) {
      const pageFile = manifest[pageKey].file;
    //  console.log(`[RESOLVER] Found ${pageFile} for the query ${pageKey}`);
      jsFiles.add(pageFile);
    }
    // Add tge entry-client and its resolved imports
    const entry = manifest["../entry-client.tsx"];
    if (entry && entry.file) {
      jsFiles.add(entry.file);
      if (Array.isArray(entry.imports)) {
        for (const importId of entry.imports) {
          const resolved = manifest[importId]?.file;
          if (resolved) jsFiles.add(resolved);
        }
      }
    }
    // Add page dynamic imports
    if (manifest[pageKey] && Array.isArray(manifest[pageKey].imports)) {
      for (const importId of manifest[pageKey].imports) {
        const resolved = manifest[importId]?.file;
        if (resolved) jsFiles.add(resolved);
      }
    }
    return jsFiles;
  }
}

module.exports = Resolver;
