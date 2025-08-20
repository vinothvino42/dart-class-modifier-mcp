
# Dart Class Modifier MCP

This project provides a Model Context Protocol (MCP) implementation for Dart class modifiers. It allows you to query the capabilities and rules of Dart class modifiers combinations like `base class`, `abstract interface class`.

## Features

- Query Dart class modifiers and their capabilities
- Returns information about constructibility, extensibility, implementability, mixin capability, and exhaustiveness
- Handles invalid or unknown modifiers gracefully

## Supported Capabilities
- Construct
- Extended
- Implement
- Mix In
- Exhaustive

## Usage

You can query the MCP server with a Dart class modifier string, and it will return a table of capabilities. Example:

```
base class
```

Returns:

| Modifier   | Construct | Extend | Implement | Mix In | Exhaustive |
|------------|-----------|--------|-----------|--------|------------|
| base class | YES       | YES    | NO        | NO     | NO         |

Unknown or invalid modifiers will return:

| Modifier      | Construct        | Extend | Implement | Mix In | Exhaustive |
|---------------|------------------|--------|-----------|--------|------------|
| unknown class | Invalid modifier |        |           |        |            |

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the MCP server: `npm start` or as per your setup

## License

This project is licensed under the MIT License.

## Author
Vinoth - [https://vinothramajeyam.vercel.app](https://vinothramajeyam.vercel.app)
