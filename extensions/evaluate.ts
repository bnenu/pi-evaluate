import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = path.resolve(__dirname, "../skills/evaluate");

/**
 * pi-evaluate extension
 *
 * Registers the `evaluate` skill so it is available in pi via /skill:evaluate.
 * The skill handles two modes automatically:
 *   - Reespec mode: detects reespec/requests/ and loads brief + specs as contract
 *   - Standalone mode: prompts the user to paste their contract as freeform text
 */
export default function (pi: ExtensionAPI) {
  pi.on("resources_discover", () => {
    return { skillPaths: [SKILL_DIR] };
  });
}
