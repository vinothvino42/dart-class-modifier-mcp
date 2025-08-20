import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

type Capabilities = {
  construct: boolean;
  extend: boolean;
  implement: boolean;
  mixin: boolean;
  exhaustive: boolean;
};

type DartModifierCombination = Record<string, Capabilities>;

const dartModifierRef: DartModifierCombination = {
  "class": {
    construct: true,
    extend: true,
    implement: true,
    mixin: false,
    exhaustive: false,
  },
  "base class": {
    construct: true,
    extend: true,
    implement: false,
    mixin: false,
    exhaustive: false,
  },
  "interface class": {
    construct: true,
    extend: false,
    implement: true,
    mixin: false,
    exhaustive: false,
  },
  "final class": {
    construct: true,
    extend: false,
    implement: false,
    mixin: false,
    exhaustive: false,
  },
  "sealed class": {
    construct: false,
    extend: false,
    implement: false,
    mixin: false,
    exhaustive: true,
  },
  "abstract class": {
    construct: false,
    extend: true,
    implement: true,
    mixin: false,
    exhaustive: false,
  },
  "abstract base class": {
    construct: false,
    extend: true,
    implement: false,
    mixin: false,
    exhaustive: false,
  },
  "abstract interface class": {
    construct: false,
    extend: false,
    implement: true,
    mixin: false,
    exhaustive: false,
  },
  "abstract final class": {
    construct: false,
    extend: false,
    implement: false,
    mixin: false,
    exhaustive: false,
  },
  "mixin class": {
    construct: true,
    extend: true,
    implement: true,
    mixin: true,
    exhaustive: false,
  },
  "base mixin class": {
    construct: true,
    extend: true,
    implement: false,
    mixin: true,
    exhaustive: false,
  },
  "abstract mixin class": {
    construct: false,
    extend: true,
    implement: true,
    mixin: true,
    exhaustive: false,
  },
  "abstract base mixin class": {
    construct: false,
    extend: true,
    implement: false,
    mixin: true,
    exhaustive: false,
  },
  "mixin": {
    construct: false,
    extend: false,
    implement: true,
    mixin: true,
    exhaustive: false,
  },
  "base mixin": {
    construct: false,
    extend: false,
    implement: false,
    mixin: true,
    exhaustive: false,
  },
};

const server = new McpServer({
  name: "dart-class-modifier-mcp",
  version: "1.0.0",
});

server.tool(
  "dart-class-modifier",
  "Tool to get the class modifiers references in Dart",
  {
    modifier: z
      .string()
      .describe(
        "Enter a class modifier to get valid or invalid combinations and their capabilities."
      ),
  },
  async ({ modifier }, _) => {
    const headers = [
      "Modifier",
      "Construct",
      "Extend",
      "Implement",
      "Mix In",
      "Exhaustive",
    ];
    
    let mdTable = "| " + headers.join(" | ") + " |\n";
    mdTable += "| " + headers.map(() => "---------").join(" | ") + " |\n";

    const capabilities = dartModifierRef[modifier];
    if (capabilities) {
      const row = [
        modifier,
        capabilities.construct ? "YES" : "NO",
        capabilities.extend ? "YES" : "NO",
        capabilities.implement ? "YES" : "NO",
        capabilities.mixin ? "YES" : "NO",
        capabilities.exhaustive ? "YES" : "NO",
      ];
      mdTable += "| " + row.join(" | ") + " |\n";
    } else {
      mdTable += `| ${modifier} | Invalid modifier | | | | |\n`;
    }

    return {
      content: [
        {
          type: "text",
          text: mdTable,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
server.connect(transport);
