# shared-server

为多个项目提供后台支持

## Support path alias for ts-node and nodemon

```batch
yarn add tsconfig-paths typescript ts-node -D
```

create nodemon.json and configure it:

```json
{
  "ignore": ["**/*.test.ts", "**/*.spec.ts", ".git", "node_modules"],
  "watch": ["src"],
  "exec": "node -r tsconfig-paths/register -r ts-node/register ./src/index.ts",
  "ext": "ts, js"
}
```

Source: https://plusreturn.com/blog/how-to-configure-and-resolve-path-alias-with-a-typescript-project/
