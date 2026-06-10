/**
 * 将 monorepo 中所有 package.json 的 workspace:* 和 catalog: 协议
 * 替换为实际版本号，使其兼容 npm install。
 *
 * 用法: bun run script/fix-package-json.ts
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs"
import { join, relative } from "path"

const ROOT = import.meta.dir ? join(import.meta.dir, "..") : process.cwd()

// ===== catalog 版本映射 (来自根 package.json workspaces.catalog) =====
const CATALOG: Record<string, string> = {
  "@effect/opentelemetry": "4.0.0-beta.74",
  "@effect/platform-node": "4.0.0-beta.74",
  "@effect/sql-sqlite-bun": "4.0.0-beta.74",
  "@npmcli/arborist": "9.4.0",
  "@types/bun": "1.3.13",
  "@types/cross-spawn": "6.0.6",
  "@octokit/rest": "22.0.0",
  "@hono/standard-validator": "0.2.0",
  "@hono/zod-validator": "0.4.2",
  "@opentui/core": "0.3.2",
  "@opentui/keymap": "0.3.2",
  "@opentui/solid": "0.3.2",
  "ulid": "3.0.1",
  "@kobalte/core": "0.13.11",
  "@types/luxon": "3.7.1",
  "@types/node": "24.12.2",
  "@types/semver": "7.7.1",
  "@tsconfig/node22": "22.0.2",
  "@tsconfig/bun": "1.0.9",
  "@cloudflare/workers-types": "4.20251008.0",
  "@openauthjs/openauth": "0.0.0-20250322224806",
  "@pierre/diffs": "1.1.0-beta.18",
  "opentui-spinner": "0.0.6",
  "@solid-primitives/storage": "4.3.3",
  "@tailwindcss/vite": "4.1.11",
  "diff": "8.0.2",
  "dompurify": "3.3.1",
  "drizzle-kit": "1.0.0-rc.2",
  "drizzle-orm": "1.0.0-rc.2",
  "effect": "4.0.0-beta.74",
  "ai": "6.0.168",
  "cross-spawn": "7.0.6",
  "hono": "4.10.7",
  "hono-openapi": "1.1.2",
  "fuzzysort": "3.1.0",
  "luxon": "3.6.1",
  "marked": "17.0.1",
  "marked-shiki": "1.2.1",
  "remend": "1.3.0",
  "@playwright/test": "1.59.1",
  "semver": "7.7.4",
  "typescript": "5.8.2",
  "@typescript/native-preview": "7.0.0-dev.20251207.1",
  "zod": "4.1.8",
  "remeda": "2.26.0",
  "sst": "4.13.1",
  "shiki": "3.20.0",
  "solid-list": "0.3.0",
  "tailwindcss": "4.1.11",
  "virtua": "0.49.1",
  "vite": "7.1.4",
  "@solidjs/meta": "0.29.4",
  "@solidjs/router": "0.15.4",
  "@solidjs/start": "https://pkg.pr.new/@solidjs/start@dfb2020",
  "@sentry/solid": "10.36.0",
  "@sentry/vite-plugin": "4.6.0",
  "solid-js": "1.9.10",
  "vite-plugin-solid": "2.11.10",
  "@lydell/node-pty": "1.2.0-beta.12",
}

// ===== 本地 workspace 包版本 =====
const LOCAL_PACKAGES: Record<string, string> = {
  "@opencode-ai/plugin": "1.16.0",
  "@opencode-ai/script": "1.16.0",
  "@opencode-ai/sdk": "1.16.0",
  "@opencode-ai/core": "1.16.0",
  "@opencode-ai/cli": "1.16.0",
  "@opencode-ai/server": "1.16.0",
  "@opencode-ai/http-recorder": "1.16.0",
  "@opencode-ai/ui": "1.16.0",
  "@opencode-ai/effect-drizzle-sqlite": "1.16.0",
  "@opencode-ai/effect-sqlite-node": "1.16.0",
  "@opencode-ai/stats-core": "1.16.0",
  "@opencode-ai/console-core": "1.16.0",
  "@opencode-ai/console-mail": "1.16.0",
  "@opencode-ai/console-resource": "1.16.0",
  "@opencode-ai/llm": "1.16.0",
  "@opencode-ai/app": "1.16.0",
  "opencode": "1.16.0",
}

function findPackageJsonFiles(dir: string): string[] {
  const results: string[] = []
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      // 跳过 node_modules, .git, dist 等
      if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "dist" || entry.name === "ts-dist" || entry.name === ".turbo" || entry.name === "target") continue
      results.push(...findPackageJsonFiles(fullPath))
    } else if (entry.name === "package.json") {
      results.push(fullPath)
    }
  }
  return results
}

function fixContent(content: string): string {
  let result = content

  // 替换 workspace:* 为实际版本
  for (const [name, version] of Object.entries(LOCAL_PACKAGES)) {
    const pattern = `"${name}": "workspace:*"`
    const replacement = `"${name}": "^${version}"`
    if (result.includes(pattern)) {
      result = result.replaceAll(pattern, replacement)
      console.log(`  ✓ workspace:* → ^${version}  (${name})`)
    }
  }

  // 替换 catalog: 为实际版本
  for (const [name, version] of Object.entries(CATALOG)) {
    const pattern = `"${name}": "catalog:"`
    const replacement = `"${name}": "${version}"`
    if (result.includes(pattern)) {
      result = result.replaceAll(pattern, replacement)
      console.log(`  ✓ catalog: → ${version}  (${name})`)
    }
  }

  return result
}

function main() {
  const files = findPackageJsonFiles(ROOT)
  console.log(`找到 ${files.length} 个 package.json 文件\n`)

  let modifiedCount = 0
  for (const file of files) {
    const relPath = relative(ROOT, file)
    const content = readFileSync(file, "utf-8")
    const fixed = fixContent(content)
    if (fixed !== content) {
      writeFileSync(file, fixed, "utf-8")
      modifiedCount++
      console.log(`  → ${relPath}`)
    }
  }

  console.log(`\n✅ 完成！共修改 ${modifiedCount} 个文件`)
}

main()
