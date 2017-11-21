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
    "forApp": {
      "type": "confirm",
      "message": "Use mint-ui for App / iView for PC"
    },
    "dependency": {
      "type": "confirm",
      "message": "import Vue and UI with CDN ?"
    },
    "filters": {
      "template/src/test/a/**/*": "forApp" 
    }
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/supaide/vue-template"
}
