import {v4 as uuid} from 'uuid';

export const fileNamer = (req: Express.Request, file: Express.Multer.File, callBack: Function): void => {

  // console.log({file});

  if(!file) {
    return callBack(new Error('File is Empty'), false);
  }

  const fileExtension: string = file.mimetype.split('/')[1];

  const fileName: string = `${uuid()}.${fileExtension}`

  callBack(null, fileName);
}