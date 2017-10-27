const path = require('path')
const yaml = require('js-yaml')
const fs   = require('fs')
const buildConfig = require('../config')

const projectPath = process.cwd()

const srcPath = path.resolve(projectPath + path.sep + 'src')
const pagePath = path.resolve(projectPath + path.sep + 'src' + path.sep + buildConfig.build.env.PAGE_PATH)
const srcPathLen = srcPath.length
const pagePathLen = pagePath.length

const fileTypes = ['.js', '.vue']
const components = {}
const topPaths = {}

const unusedKeys = ['_index', 'alias']
const delUnusedKey = function (configs) {
  configs.forEach(function (config) {
    unusedKeys.forEach(function (key) {
      delete config[key]
    })
    if (config.children) {
      delUnusedKey(config.children)
    }
  })
}

const addComponent = function (key, file) {
  let path0 = file.substr(srcPathLen)
  key = key.substr(pagePathLen+1).split(path.sep).join('__')
  //components[key] = "r => require.ensure([], () => r(require('." + path0 + "')), '"+key+"')"
  components[key] = "() => import(/* webpackChunkName: \""+key+"\" */ '." + path0 + "')"
  return key
}

const processAlias = function (nodes) {
  if (!nodes) {
    return
  }
  nodes.forEach(function (node) {
    let alias = node.alias
    if (!alias || !node.path) {
      return true
    }
    if (alias.length > 1 && alias.slice(0, 1) === '/') {
      alias = alias.slice(1)
    }
    topPaths[alias] = node.path
  })
}

const readConfig = function (path0) {
  let file = path0 + path.sep + 'config.yaml'
  if (fs.existsSync(file)) {
    try {
      return yaml.safeLoad(fs.readFileSync(path0 + path.sep + 'config.yaml', 'utf8'))
    } catch (e) {
      console.log(e);
    }
  }
  return {}
}

const resort = function (names, sort) {
  if (!sort) {
    return names
  }
  let names1 = []
  sort.map(function (name) {
    if (names.indexOf(name) >= 0) {
      names1.push(name)
    }
  })
  names.map(function (name) {
    if (names1.indexOf(name) < 0) {
      names1.push(name)
    }
  })
  return names1
}

const parser = function (path0, configs) {
  let dirs = []
  let files = {}
  let fileNames = []
  let yamlConfig = readConfig(path0)
  configs.children = []
  fs.readdirSync(path0).forEach(function (file, index) {
    if (file.indexOf('_') === 0) {
      // _开头的文件或目录，不处理
      return true
    }
    let currentFile = path0 + path.sep + file
    if (fs.lstatSync(currentFile).isDirectory()) {
      dirs.push(file.toLowerCase())
    } else {
      fileTypes.map(function (type) {
        if (file.slice(0-type.length).toLowerCase() === type.toLowerCase()) {
          let f = file.slice(0, 0-type.length).toLowerCase()
          fileNames.push(f)
          let key = addComponent(currentFile.slice(0, 0-type.length).toLowerCase(), currentFile)
          files[f] = [currentFile, key]
        }
      })
    }
  })
  let fileSort 
  if (yamlConfig.__sort) {
    fileSort = []
    yamlConfig.__sort.map(function (k) {
      fileSort.push(k.toLowerCase())
    })
  }
  dirs = resort(dirs, fileSort)
  fileNames = resort(fileNames, fileSort)
  let files1 = []
  dirs.map(function (dir) {
    if (fileNames.indexOf(dir) >= 0) {
      // 文件名和子目录同名
      files1.push(dir)
    }
  })
  let files2 = fileNames.filter(function (f) {
    return files1.indexOf(f) < 0
  })
  dirs.map(function (dir) {
    let route = {
      _index: configs.children.length,
      path: dir,
    }
    Object.assign(route, yamlConfig[dir])
    if (files1.indexOf(dir) >= 0) {
      route.component = files[dir][1]
    }
    configs.children.push(route)
    parser(path0 + path.sep + dir, route)
    if (!route.component && route.children) {
      let newChild = configs.children.slice(0, route._index)
      route.children.forEach(function (item) {
        item.path = route.path + '/' + item.path
        item._index = newChild.length
        newChild.push(item)
      })
      configs.children.slice(route._index+1).forEach(function (item) {
        item._index = newChild.length
        newChild.push(item)
      })
      configs.children = newChild
    }
  })
  files2.map(function (f) {
    let route = {
      _index: configs.children.length,
      path: f,
      component: files[f][1]
    }
    Object.assign(route, yamlConfig[f])
    configs.children.push(route)
  })
  processAlias(configs.children)
}

module.exports = function () {
  let pageConfigs = {}
  parser(pagePath, pageConfigs)

  let components0 = []
  Object.keys(components).forEach(function (k) {
    components0.push('const '+k+' = '+components[k])
  })

  if (pageConfigs.children) {
    pageConfigs = pageConfigs.children
  }

  let topPaths0 = []
  Object.keys(topPaths).forEach(function (alias) {
    topPaths0.push({
      path: alias,
      redirect: topPaths[alias]
    })
  })

  pageConfigs = topPaths0.concat(pageConfigs)

  delUnusedKey(pageConfigs)

  let configs = components0.join("\n")
  configs += "\n\n export default " + JSON.stringify(pageConfigs).
    replace(/"component":"(\w+)"/g, '"component":$1').
    replace(/"(\w+)":/g, "$1:")

  fs.writeFileSync(srcPath + path.sep + buildConfig.build.env.PAGES_CONFIG_FILE , configs)
}