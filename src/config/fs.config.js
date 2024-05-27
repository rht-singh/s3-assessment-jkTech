/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable radix */
const fs = require('fs');

const uploadFile = async (req) => {
  // check root folder to store object is exist in root or not
  const rootPath = `${process.cwd()}/objects`;
  const isRootFolderExist = fs.existsSync(rootPath);
  if (!isRootFolderExist) {
    // then create a uploads folder
    fs.mkdirSync(rootPath);
  }
  const fileInfo = req.file;
  // fetch folder info
  const fileType = fileInfo.originalname.split('.').pop();
  // check that folder exist or not if not create new one
  const subFolder = `${rootPath}/${fileType}`;
  if (!fs.existsSync(subFolder)) {
    fs.mkdirSync(subFolder);
  }
  const currTimestamp = Date.now();
  let fileName = fileInfo.originalname.toLowerCase();
  fileName = fileName.replace(/\s+/g, '');
  fileInfo.exactFilePath = `${subFolder}/${currTimestamp}-${fileName}`;
  const writeStream = fs.createWriteStream(`${subFolder}/${currTimestamp}-${fileName}`);
  writeStream.write(fileInfo.buffer);
  writeStream.end();
  writeStream.on('finish', () => {
    console.log('All data has been written to the file.');
  });
  writeStream.on('error', (err) => {
    console.error('An error occurred:', err);
  });
  // fs.writeFile(`${subFolder}/${currTimestamp}-${fileName}`, fileInfo.buffer);
  fileInfo.fileName = fileName;
  fileInfo.fileUrl = `/${fileType}/${currTimestamp}-${fileName}`;
  fileInfo.fileType = fileType;
  return fileInfo;
};

const deleteFile = (filePath) => fs.unlinkSync(filePath);
const updateFile = async (fileInfo) => {
  const _result = {};
  const rootPath = `${process.cwd()}/objects`;
  let fileType = fileInfo.originalname.split('.');
  fileType = fileType[fileType.length - 1];
  // check that folder exist or not if not create new one
  const subFolder = `${rootPath}/${fileType}`;
  if (!fs.existsSync(subFolder)) {
    fs.mkdirSync(subFolder);
  }
  const currTimestamp = Date.now();
  let fileName = fileInfo.originalname.toLowerCase();
  fileName = fileName.replace(/\s+/g, '');
  const writeStream = fs.createWriteStream(`${subFolder}/${currTimestamp}-${fileName}`);
  writeStream.write(fileInfo.buffer);
  writeStream.end();
  writeStream.on('finish', () => {
    console.log('All data has been written to the file.');
  });
  writeStream.on('error', (err) => {
    console.error('An error occurred:', err);
  });
  _result.fileName = fileName;
  _result.fileUrl = `/${fileType}/${currTimestamp}-${fileName}`;
  _result.fileType = fileType;
  _result.size = fileInfo.size;
  // delete previous file
  await deleteFile(`${rootPath}${fileInfo.oldFilePath}`);
  return _result;
};

module.exports = {
  uploadFile,
  deleteFile,
  updateFile,
};
