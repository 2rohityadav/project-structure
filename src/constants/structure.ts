export const initialStructure = {
  apps: {
    falcon: {
      src: {
        app: {
          core: {
            guards: {},
            interceptors: {},
            services: {},
            files: ["core.module.ts"],
          },
          features: {
            auth: {
              components: {},
              services: {},
              models: {},
              guards: {},
              store: {},
              files: ["auth.module.ts"],
            },
            dashboard: {},
            "other-features": {},
          },
        },
      },
    },
  },
};
