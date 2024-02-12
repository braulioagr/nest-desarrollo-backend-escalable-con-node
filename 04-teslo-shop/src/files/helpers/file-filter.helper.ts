
export const fileFilter = (req: Express.Request, file: Express.Multer.File, callBack: Function): void => {

  // console.log({file});

  if(!file) {
    return callBack(new Error('File is Empty'), false);
  }

  const fileExtension: string = file.mimetype.split('/')[1];

  const validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gift']
  
  if(!validExtensions.includes(fileExtension)) {
    return callBack(new Error('File type is invalid'), false);
  }

  callBack(null,true)
}