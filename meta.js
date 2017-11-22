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
    "dependency": {
      "type": "list",
      "message": "dependency mode",
      "choices": [
        {
          "name": "totaly import",
          "value": "totaly",
          "short": "totaly"
        },
        {
          "name": "import by need",
          "value": "byneed",
          "short": "byneed"
        },
        {
          "name": "import by cdn",
          "value": "cdn",
          "short": "cdn"
        },
      ]
    }
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/supaide/vue-cms-template"
}
