module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vue.js project"
    },
    "version": {
      "type": "string",
      "message": "Project version",
      "default": "1.0.0"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "type": {
      "type": "list",
      "message": "App or Admin(cms, pc, etc...)",
      "choices": [
        {
          "name": "Project for app",
          "value": "app",
          "short": "app"
        },
        {
          "name": "Project for app use cdn",
          "value": "capp",
          "short": "app + cdn"
        },
        {
          "name": "Project for admin",
          "value": "admin",
          "short": "admin"
        },
        {
          "name": "Project for admin use cdn",
          "value": "cadmin",
          "short": "admin + cdn"
        }
      ]
    },
    "build": {
      "type": "list",
      "message": "Vue build",
      "choices": [
        {
          "name": "Runtime + Compiler: recommended for most users",
          "value": "standalone",
          "short": "standalone"
        },
        {
          "name": "Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere",
          "value": "runtime",
          "short": "runtime"
        }
      ]
    },
    "router": {
      "type": "confirm",
      "message": "Install vue-router?"
    },
    "filters": {
      "src/router/**/*": "router" 
    }
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/supaide/vue-template"
}
