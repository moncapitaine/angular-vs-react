import fse from 'fs-extra'
console.log('...deployment to tomcat')
console.log('...tomcat webapp folder')
const tomCatWebappFolderPath = '../main/webapp'
console.log('...dist folder')
const distFolderPath = './dist'

try {
  fse.copySync(distFolderPath, tomCatWebappFolderPath, { overwrite: true})
  fse.copySync(tomCatWebappFolderPath + '/assets/index.js', tomCatWebappFolderPath + '/assets/vvc-dev.js', { overwrite: true})
  fse.copySync(tomCatWebappFolderPath + '/assets/index.js', tomCatWebappFolderPath + '/assets/vvc.js', { overwrite: true})
  console.log('...success')
} catch (err) {
  console.error(err)
}



