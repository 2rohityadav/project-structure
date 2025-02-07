import { TreeNodeContent } from "../models/FolderStructure";

export const initialStructure = {
  ".husky": {},
  ".nx": {},
  ".vscode": {},
  apps: {
    falcon: {
      files: [
        "eslint.config.mjs",
        "jest.config.ts",
        "project.json",
        "tsconfig.app.json",
        "tsconfig.editor.json",
        "tsconfig.json",
        "tsconfig.spec.json",
      ],
      src: {
        files: ["index.html", "main.ts", "styles.scss", "test-setup.ts"],
        app: {
          auth: {
            components: {
              files: ["auth-base.component.ts"],
              login: {},
              register: {},
            },
            models: {
              files: ["auth.model.ts"],
            },
          },
          files: [
            "app.component.html",
            "app.component.scss",
            "app.component.spec.ts",
            "app.component.ts",
            "app.config.ts",
            "app.routes.ts",
            "nx-welcome.component.ts",
          ],
          features: {
            "account-management": {
              components: {},
              models: {},
              services: {},
              files: ["routes.ts"],
            },
            admin: {
              components: {},
              "features-admin": {
                "system-admin": {},
                "user-admin": {},
              },
              files: ["routes.ts"],
            },
            dashboard: {},
            "user-management": {},
          },
        },
        core: {
          guards: {
            files: ["auth.guard.ts"],
          },
          interceptors: {
            files: ["http.interceptor.ts"],
          },
          services: {
            files: ["auth.service.ts", "http.service.ts"],
          },
        },
        shared: {
          constants: {},
          directives: {},
          pipes: {},
          ui: {
            components: {
              button: {
                files: ["button.component.ts"],
              },
              card: {
                files: ["card.component.ts"],
              },
            },
            layout: {},
          },
          utils: {},
          validators: {},
        },
        store: {
          actions: {},
          effects: {},
          reducers: {},
        },
      },
    },
    "falcon-e2e": {
      files: [
        "eslint.config.mjs",
        "playwright.config.ts",
        "project.json",
        "tsconfig.json",
      ],
      src: {
        files: ["example.test.ts"],
      },
    },
  },
  hooks: {
    "check-branch-name": {
      files: ["config.js", "index.js", "logger.js"],
    },
    "check-commit": {
      files: ["config.js", "index.js", "logger.js", "matcher.js"],
    },
  },
  ".editorconfig": null,
  ".gitignore": null,
  ".gitlab-ci.yml": null,
  ".npmrc": null,
  ".prettierignore": null,
  ".prettierrc": null,
  "eslint.config.mjs": null,
  "jest.config.ts": null,
  "jest.preset.js": null,
  "nx.json": null,
  "package.json": null,
  "pnpm-lock.yaml": null,
  "README.md": null,
  "tsconfig.base.json": null,
} as TreeNodeContent;
