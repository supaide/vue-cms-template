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
          "name": "Project for admin",
          "value": "admin",
          "short": "admin"
        }
      ]
    },
    "dependency": {
      "type": "confirm",
      "message": "import Vue and UI with CDN ?"
    },
    "filters": {
      "template/src/test/a/**/*": "name" 
    }
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/supaide/vue-template"
}
